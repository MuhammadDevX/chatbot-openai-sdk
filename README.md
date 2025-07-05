# Chatbot Agents SDK

A real-time chat application with streaming responses built with FastAPI backend and Next.js frontend.

## Features

- Real-time streaming chat responses
- Proper message ordering and display
- Auto-scroll to latest messages
- Loading states during responses
- CORS support for local development

## Setup

### Backend (FastAPI)

1. Install Python dependencies:
```bash
pip install fastapi uvicorn sqlalchemy asyncpg python-dotenv
```

2. Set up environment variables in `.env`:
```
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/chatbot
OPENAI_API_KEY=your_openai_api_key
```

3. Run the backend:
```bash
python main.py
```

The backend will run on `http://localhost:8000`

### Frontend (Next.js)

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

4. Run the frontend:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Start a new conversation or select an existing one
3. Type your message and press Enter
4. Watch the assistant's response stream in real-time

## Fixed Issues

- ✅ Removed "DONE" text from user interface
- ✅ Fixed message ordering (user messages now appear correctly)
- ✅ Implemented proper streaming responses
- ✅ Added loading states and disabled input during responses
- ✅ Added auto-scroll to latest messages
- ✅ Added CORS support for local development
