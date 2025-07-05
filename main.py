import os
import asyncio
from datetime import datetime
from typing import List
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from sqlalchemy.future import select
from agents import Agent, Runner, ItemHelpers
from openai.types.responses import ResponseTextDeltaEvent
from dotenv import load_dotenv

# Load env vars
load_dotenv(override=True)
DATABASE_URL = os.getenv("DATABASE_URL")  # e.g. postgresql+asyncpg://user:pass@localhost:5432/chatbot
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# SQLAlchemy async setup
engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)
Base = declarative_base()

# Models - matching Prisma schema exactly
class User(Base):
    __tablename__ = "User"
    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=True)
    createdAt = Column(DateTime, default=datetime.utcnow)
    conversations = relationship("Conversation", back_populates="user")

class Conversation(Base):
    __tablename__ = "Conversation"
    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    userId = Column(String, ForeignKey("User.id"), nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="conversations")
    messages = relationship("Message", back_populates="conversation")

class Message(Base):
    __tablename__ = "Message"
    id = Column(String, primary_key=True, index=True)
    role = Column(String, nullable=False)
    content = Column(String, nullable=False)
    conversationId = Column(String, ForeignKey("Conversation.id"), nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    conversation = relationship("Conversation", back_populates="messages")

# Pydantic schemas
class ChatRequest(BaseModel):
    user_id: str
    conv_id: str
    prompt: str


class ConversationOut(BaseModel):
    id: str
    title: str

    class Config:
        orm_mode = True

# Dependency to get DB session
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

# Initialize app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper to save messages
async def save_message(db: AsyncSession, conv_id: str, role: str, content: str):
    # Generate a simple unique ID - in production, you might want to use a proper cuid generator
    import uuid
    msg_id = str(uuid.uuid4())
    
    msg = Message(
        id=msg_id, 
        role=role, 
        content=content, 
        conversationId=conv_id,
        createdAt=datetime.utcnow()
    )
    db.add(msg)
    await db.commit()


async def get_or_create_conversation(db: AsyncSession, user_id: str, conv_id: str):
    # Use async select to get conversation
    result = await db.execute(select(Conversation).where(Conversation.id == conv_id))
    conv = result.scalar_one_or_none()
    
    if not conv:
        conv = Conversation(
            id=conv_id, 
            title="New Conversation", 
            userId=user_id, 
            createdAt=datetime.utcnow()
        )
        db.add(conv)
        await db.commit()
        await db.refresh(conv)
    return conv    


@app.get("/chat", response_model=List[ConversationOut])
async def get_conversations(
    conversations: int = Query(0),
    user_id: str = Query("123"),  # ⚠️ You can replace this with actual auth
    db: AsyncSession = Depends(get_db),
):
    if conversations != 1:
        return []

    # Fetch conversations belonging to the user
    result = await db.execute(
        select(Conversation).where(Conversation.userId == user_id)
    )
    convs = result.scalars().all()
    return convs




@app.post("/chat/stream")
async def chat_stream(req: ChatRequest, db: AsyncSession = Depends(get_db)):
    # Ensure conversation exists
    await get_or_create_conversation(db, req.user_id, req.conv_id)
    
    # Save user message
    await save_message(db, req.conv_id, "user", req.prompt)
    
    async def event_generator():
        assistant_response = ""
        
        try:
            # Create agent per request
            agent = Agent(
                name="Assistant",
                instructions="Respond to the user prompt conversationally.",
                model='gpt-4o-mini'
            )
            
            # Use run_streamed and handle the events properly
            runner = Runner.run_streamed(agent, input=req.prompt)
            
            # Process streaming events
            async for event in runner.stream_events():
                print(f"Event type: {event.type}, Event data type: {type(event)}")
                
                if event.type == "raw_response_event" and isinstance(event.data, ResponseTextDeltaEvent):
                    # Get the delta text from the ResponseTextDeltaEvent
                    delta_text = event.data.delta
                    print(f"Delta text: '{delta_text}'")
                    if delta_text and delta_text.strip():
                        assistant_response += delta_text
                        yield f"data: {delta_text}\n\n"
            
            # Fallback: If no streaming content was received, get the final result
            if not assistant_response:
                try:
                    # Get the final result from the streaming runner
                    final_result = await runner
                    final_response = str(final_result)
                    
                    # Stream the response word by word
                    words = final_response.split()
                    for word in words:
                        assistant_response += word + " "
                        yield f"data: {word} \n\n"
                        await asyncio.sleep(0.05)
                except Exception as e:
                    print(f"Error getting final result: {e}")
                    yield f"data: Error: Could not get response\n\n"
            
            # Save complete assistant response after streaming
            if assistant_response:
                # Create new DB session for saving final response
                async with AsyncSessionLocal() as save_db:
                    await save_message(save_db, req.conv_id, "assistant", assistant_response)
            
            # Send end-of-stream signal
            yield "data: [DONE]\n\n"
                    
        except Exception as e:
            yield f"data: Error: {str(e)}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)