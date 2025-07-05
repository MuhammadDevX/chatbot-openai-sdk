# Chatbot Agents SDK with Authentication

A real-time chat application with streaming responses, user authentication, and markdown support built with FastAPI backend and Next.js frontend.

## Features

- ✅ **User Authentication**: Sign up, sign in, and secure user sessions
- ✅ **Real-time streaming chat responses** with markdown support
- ✅ **User-specific conversations**: Each user sees only their own chats
- ✅ **JWT-based authentication** with secure token management
- ✅ **Password hashing** using bcrypt for security
- ✅ **Protected routes** - unauthenticated users are redirected to signin
- ✅ **Auto-scroll to latest messages**
- ✅ **Loading states during responses**
- ✅ **CORS support for local development**

## Authentication System

### Backend Authentication (FastAPI)

The backend uses JWT tokens for authentication with the following endpoints:

- `POST /auth/signup` - Create a new user account
- `POST /auth/signin` - Sign in with email and password
- `GET /auth/me` - Get current user information (protected)
- `POST /chat/stream` - Chat streaming (protected)
- `GET /chat` - Get user conversations (protected)

### Frontend Authentication (Next.js)

- **AuthContext**: Manages authentication state across the app
- **Protected Routes**: Automatically redirect unauthenticated users
- **Token Storage**: JWT tokens stored in localStorage
- **Auto-login**: Tokens are validated on app startup

## Setup

### Prerequisites

- Python 3.12+
- Node.js 18+
- PostgreSQL database

### Backend Setup

1. **Install Python dependencies**:
```bash
pip install fastapi uvicorn sqlalchemy asyncpg python-dotenv pyjwt bcrypt pydantic[email]
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

1. **Navigate to the frontend directory**:
```bash
cd frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create `.env.local` file**:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

4. **Run the frontend**:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Database Schema

The application uses the following database models:

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

## Usage

1. **Open** `http://localhost:3000` in your browser
2. **Sign up** for a new account or **sign in** with existing credentials
3. **Start chatting** - your conversations will be saved and associated with your account
4. **View your chat history** in the sidebar
5. **Sign out** when done

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Tokens**: Secure token-based authentication
- **Protected Routes**: Backend endpoints require valid authentication
- **User Isolation**: Users can only access their own conversations
- **Token Expiration**: JWT tokens expire after 24 hours

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/signin` - Login user
- `GET /auth/me` - Get current user info

### Chat
- `GET /chat?conversations=1` - Get user conversations
- `POST /chat/stream` - Stream chat responses

## Multiple Authentication Approaches

### 1. JWT Tokens (Current Implementation)
- **Pros**: Stateless, scalable, works well with microservices
- **Cons**: Tokens can't be invalidated before expiration
- **Best for**: Most web applications

### 2. Session-based Authentication
- **Pros**: Can be invalidated, more control
- **Cons**: Requires server-side session storage
- **Best for**: Applications requiring immediate logout

### 3. OAuth 2.0 / OpenID Connect
- **Pros**: Industry standard, third-party login support
- **Cons**: More complex to implement
- **Best for**: Applications needing social login

### 4. API Keys
- **Pros**: Simple, good for machine-to-machine
- **Cons**: Less secure for user authentication
- **Best for**: API access, not user authentication

## Troubleshooting

### Common Issues

1. **Database Connection**: Ensure PostgreSQL is running and DATABASE_URL is correct
2. **CORS Errors**: Check that frontend URL is in backend CORS settings
3. **Authentication Errors**: Verify JWT_SECRET is set and consistent
4. **Streaming Issues**: Check that all required Python packages are installed

### Development Tips

- Use browser dev tools to inspect network requests
- Check backend logs for detailed error messages
- Verify token is being sent in Authorization header
- Test authentication endpoints with tools like Postman

## Production Considerations

- Change JWT_SECRET to a strong, unique value
- Use HTTPS in production
- Set up proper database backups
- Configure CORS for production domains
- Add rate limiting for authentication endpoints
- Consider using Redis for session storage
- Implement password reset functionality
- Add email verification
