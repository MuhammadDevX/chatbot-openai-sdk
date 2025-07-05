# AI Chatbot with Authentication & Conversation Management

A full-stack AI chat application with real-time streaming responses, user authentication, conversation history, and intelligent title generation. Built with FastAPI backend and Next.js frontend using the OpenAI Agents SDK.

## ✨ Features

- 🔐 **Complete User Authentication**: Sign up, sign in, and secure user sessions with JWT
- 💬 **Real-time Streaming Chat**: Instant AI responses with markdown support
- 📚 **Conversation History**: Persistent chat history with user-specific conversations
- 🤖 **AI Agent Integration**: Powered by OpenAI Agents SDK for intelligent responses
- 🏷️ **Smart Title Generation**: Automatic conversation titles using AI
- 🎨 **Modern UI**: Beautiful gradient design with responsive layout
- 📱 **Protected Routes**: Secure access control with automatic redirects
- 🔒 **Password Security**: Bcrypt hashing for secure password storage
- ⚡ **Auto-scroll & Loading States**: Smooth user experience with real-time feedback
- 🌐 **CORS Support**: Configured for local development and production

## 🏗️ Architecture

### Backend (FastAPI)
- **Authentication**: JWT-based with bcrypt password hashing
- **Database**: PostgreSQL with SQLAlchemy async ORM
- **AI Integration**: OpenAI Agents SDK for intelligent responses
- **Streaming**: Server-Sent Events for real-time chat
- **Security**: Protected routes with user verification

### Frontend (Next.js)
- **Authentication**: Context-based auth state management
- **UI Framework**: Tailwind CSS with custom components
- **State Management**: React Query for server state
- **Markdown Support**: React Markdown with syntax highlighting
- **Real-time Updates**: SSE parsing for streaming responses

## 🚀 Quick Start

### Prerequisites

- Python 3.12+
- Node.js 18+
- PostgreSQL database
- OpenAI API key

### Backend Setup

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd chatbot-agents-sdk
pip install -r requirements.txt
```

2. **Set up environment variables** in `.env`:
```env
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/chatbot
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

3. **Run the backend**:
```bash
python main.py
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**:
```bash
cd frontend
npm install
```

2. **Create `.env.local` file**:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

3. **Run the frontend**:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📊 Database Schema

```sql
-- Users table
CREATE TABLE "User" (
    id VARCHAR PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    name VARCHAR,
    password VARCHAR NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Conversations table
CREATE TABLE "Conversation" (
    id VARCHAR PRIMARY KEY,
    title VARCHAR NOT NULL,
    "userId" VARCHAR NOT NULL REFERENCES "User"(id),
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE "Message" (
    id VARCHAR PRIMARY KEY,
    role VARCHAR NOT NULL,
    content VARCHAR NOT NULL,
    "conversationId" VARCHAR NOT NULL REFERENCES "Conversation"(id),
    "createdAt" TIMESTAMP DEFAULT NOW()
);
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/signin` - Login user
- `GET /auth/me` - Get current user info

### Chat & Conversations
- `GET /chat?conversations=1` - Get user conversations
- `GET /chat/{conversation_id}/messages` - Get conversation messages
- `POST /chat/stream` - Stream chat responses
- `POST /chat/{conversation_id}/title` - Generate conversation title

## 🎯 Usage Guide

1. **Start the application**: Run both backend and frontend servers
2. **Create account**: Sign up with email and password
3. **Start chatting**: Begin a conversation with the AI
4. **View history**: Access your conversation history in the sidebar
5. **Automatic titles**: Conversation titles are generated after enough messages
6. **Secure logout**: Sign out when finished

## 🔧 Key Features Explained

### AI Agent Integration
- Uses OpenAI Agents SDK for intelligent responses
- Maintains conversation context for coherent discussions
- Supports streaming responses for real-time interaction

### Conversation Management
- Each user has isolated conversations
- Messages are persisted in PostgreSQL
- Automatic title generation using AI
- Real-time message loading and display

### Authentication Flow
- JWT tokens with 24-hour expiration
- Secure password hashing with bcrypt
- Protected API endpoints
- Automatic token validation

### Streaming Implementation
- Server-Sent Events for real-time responses
- Proper event parsing and display
- Loading states and error handling
- Auto-scroll to latest messages

## 🛡️ Security Features

- **Password Hashing**: Bcrypt with salt for secure storage
- **JWT Tokens**: Secure token-based authentication
- **Protected Routes**: Backend endpoints require valid authentication
- **User Isolation**: Users can only access their own conversations
- **Token Expiration**: Automatic token refresh handling
- **CORS Configuration**: Proper cross-origin request handling

## 🚀 Production Deployment

### Environment Setup
- Use strong, unique JWT_SECRET
- Configure HTTPS in production
- Set up proper database backups
- Configure CORS for production domains

### Security Considerations
- Add rate limiting for authentication endpoints
- Implement password reset functionality
- Add email verification
- Consider using Redis for session storage
- Set up monitoring and logging

### Performance Optimization
- Database connection pooling
- CDN for static assets
- Caching strategies
- Load balancing for high traffic

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**: Ensure PostgreSQL is running and DATABASE_URL is correct
2. **CORS Errors**: Check that frontend URL is in backend CORS settings
3. **Authentication Errors**: Verify JWT_SECRET is set and consistent
4. **Streaming Issues**: Check that all required Python packages are installed
5. **AI Agent Errors**: Verify OpenAI API key and quota

### Development Tips

- Use browser dev tools to inspect network requests
- Check backend logs for detailed error messages
- Verify token is being sent in Authorization header
- Test authentication endpoints with tools like Postman
- Monitor database connections and queries

## 📦 Dependencies

### Backend Dependencies
- FastAPI - Web framework
- SQLAlchemy - Database ORM
- OpenAI Agents SDK - AI integration
- PyJWT - JWT authentication
- Bcrypt - Password hashing
- Uvicorn - ASGI server

### Frontend Dependencies
- Next.js 15 - React framework
- Tailwind CSS - Styling
- React Query - State management
- React Markdown - Markdown rendering
- Framer Motion - Animations
- Lucide React - Icons

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
