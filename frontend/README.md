# AI Chatbot Frontend

A modern Next.js frontend for the AI Chatbot application featuring real-time streaming chat, user authentication, conversation management, and intelligent title generation.

## ✨ Features

- 🔐 **User Authentication**: Complete sign-up/sign-in flow with JWT tokens
- 💬 **Real-time Chat**: Streaming AI responses with markdown support
- 📚 **Conversation History**: Persistent chat history with sidebar navigation
- 🏷️ **Smart Titles**: Automatic conversation title generation
- 🎨 **Modern UI**: Beautiful gradient design with responsive layout
- 📱 **Protected Routes**: Secure access control with automatic redirects
- ⚡ **Performance**: Optimized with React Query and efficient state management
- 🔄 **Real-time Updates**: Server-Sent Events for instant message streaming

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Query for server state
- **Authentication**: Context-based auth with JWT
- **UI Components**: Custom components with Framer Motion animations
- **Markdown**: React Markdown with syntax highlighting
- **Icons**: Lucide React for consistent iconography

### Key Components
- **AuthContext**: Manages authentication state across the app
- **ProtectedRoute**: HOC for securing pages
- **ChatList**: Sidebar with conversation history
- **ChatPage**: Main chat interface with streaming
- **MarkdownMessage**: Renders markdown content with syntax highlighting
- **StreamingHook**: Handles real-time message streaming

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Backend server running on `http://localhost:8000`

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables** in `.env.local`:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

3. **Run the development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── (chat)/            # Chat route group
│   │   └── [id]/          # Dynamic conversation routes
│   ├── auth/              # Authentication pages
│   │   ├── signin/        # Sign in page
│   │   └── signup/        # Sign up page
│   ├── api/               # API routes
│   │   ├── auth/          # Auth API endpoints
│   │   └── chat/          # Chat API endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── AuthContext.tsx    # Authentication context
│   ├── ChatList.tsx       # Conversation sidebar
│   ├── MarkdownMessage.tsx # Markdown renderer
│   └── ProtectedRoute.tsx # Route protection HOC
├── contexts/              # React contexts
├── hooks/                 # Custom hooks
│   └── useStreaming.ts    # Streaming hook
├── lib/                   # Utility functions
└── prisma/                # Database schema
```

## 🔌 API Integration

### Authentication Endpoints
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User registration
- `GET /api/auth/me` - Get current user

### Chat Endpoints
- `GET /api/chat` - Get user conversations
- `GET /api/chat/[conversationId]/messages` - Get conversation messages
- `POST /api/chat/stream` - Stream chat responses
- `POST /api/chat/[conversationId]/title` - Generate conversation title

## 🎯 Key Features

### Authentication Flow
1. **Sign Up**: Users create accounts with email and password
2. **Sign In**: Secure login with JWT token generation
3. **Token Management**: Automatic token storage and validation
4. **Protected Routes**: Unauthenticated users redirected to signin
5. **Auto-login**: Tokens validated on app startup

### Chat Interface
1. **Real-time Streaming**: Instant AI responses with Server-Sent Events
2. **Message History**: Persistent conversation storage
3. **Markdown Support**: Rich text rendering with syntax highlighting
4. **Auto-scroll**: Automatic scrolling to latest messages
5. **Loading States**: Visual feedback during AI processing

### Conversation Management
1. **Sidebar Navigation**: Easy access to conversation history
2. **Smart Titles**: AI-generated conversation titles
3. **User Isolation**: Each user sees only their conversations
4. **Real-time Updates**: Live conversation list updates

## 🎨 UI/UX Features

### Design System
- **Color Scheme**: Modern gradient backgrounds
- **Typography**: Clean, readable fonts
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth transitions with Framer Motion
- **Responsive**: Mobile-first design approach

### Components
- **Chat Bubbles**: Distinct user and AI message styles
- **Loading Indicators**: Spinners and skeleton screens
- **Form Elements**: Styled inputs and buttons
- **Navigation**: Clean sidebar and header design

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Tailwind CSS**: Utility-first styling
- **Component Architecture**: Reusable, modular components

### State Management
- **React Query**: Server state management
- **Context API**: Global auth state
- **Local State**: Component-specific state
- **Optimistic Updates**: Immediate UI feedback

## 🚀 Performance Optimizations

### Frontend Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js built-in image optimization
- **Font Optimization**: Automatic font loading
- **Bundle Analysis**: Built-in bundle analyzer

### Caching Strategy
- **React Query**: Intelligent caching and background updates
- **Browser Caching**: Static asset caching
- **API Caching**: Request deduplication and caching

## 🛡️ Security

### Authentication Security
- **JWT Tokens**: Secure token-based authentication
- **Token Storage**: Secure localStorage usage
- **Route Protection**: Automatic redirect for unauthenticated users
- **Token Validation**: Server-side token verification

### Data Security
- **HTTPS**: Secure communication in production
- **CORS**: Proper cross-origin request handling
- **Input Validation**: Client-side form validation
- **XSS Protection**: Safe markdown rendering

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Errors**: Check token validity and backend connectivity
2. **Streaming Issues**: Verify SSE connection and event parsing
3. **Styling Problems**: Ensure Tailwind CSS is properly configured
4. **Build Errors**: Check TypeScript types and dependencies

### Development Tips

- Use browser dev tools to inspect network requests
- Check React Query devtools for state management
- Monitor console for authentication and streaming logs
- Test responsive design on different screen sizes

## 📦 Dependencies

### Core Dependencies
- `next`: React framework
- `react`: UI library
- `react-dom`: React DOM rendering
- `typescript`: Type safety

### UI & Styling
- `tailwindcss`: Utility-first CSS framework
- `framer-motion`: Animation library
- `lucide-react`: Icon library
- `class-variance-authority`: Component variants

### State & Data
- `@tanstack/react-query`: Server state management
- `@prisma/client`: Database client
- `eventsource-parser`: SSE parsing

### Content & Markdown
- `react-markdown`: Markdown rendering
- `remark-gfm`: GitHub Flavored Markdown

### Utilities
- `uuid`: Unique ID generation
- `clsx`: Conditional class names
- `tailwind-merge`: Tailwind class merging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
