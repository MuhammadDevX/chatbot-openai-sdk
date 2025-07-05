"use client";
import { use, useMemo, useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { useChatStream } from "@/hooks/useChatStream";
import { useMessages } from "@/hooks/useMessages";
import ChatInput from "@/components/ChatInput";
import MarkdownMessage from "@/components/MarkdownMessage";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ChatRoom({ params }: { params: Promise<{ id: string }> }) {
  const { id: convId } = use(params);
  const { user } = useAuth();
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Use the new messages hook
  const { messages, loading: messagesLoading, error: messagesError, addMessage, updateLastMessage } = useMessages(convId);
  const assistantDelta = useChatStream(pendingPrompt, user?.id || "", convId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle streaming assistant response
  useEffect(() => {
    if (assistantDelta && pendingPrompt) {
      setIsLoading(true);
      updateLastMessage(assistantDelta);
    }
  }, [assistantDelta, pendingPrompt, updateLastMessage]);

  // Clear loading state when we have a response
  useEffect(() => {
    if (assistantDelta && pendingPrompt) {
      setIsLoading(false);
    }
  }, [assistantDelta, pendingPrompt]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(text: string) {
    if (!text.trim()) return;

    // Clear any previous pending prompt
    setPendingPrompt(null);

    // Add user message
    addMessage({
      id: uuid(),
      role: "user",
      content: text,
      created_at: new Date().toISOString()
    });

    // Add assistant message placeholder
    addMessage({
      id: "assistant-" + Date.now(),
      role: "assistant",
      content: "",
      created_at: new Date().toISOString()
    });

    // Start streaming
    setPendingPrompt(text);
    setIsLoading(true);
  }

  // Show loading state while messages are being fetched
  if (messagesLoading) {
    return (
      <ProtectedRoute>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading conversation...</div>
        </div>
      </ProtectedRoute>
    );
  }

  // Show error state if messages failed to load
  if (messagesError) {
    return (
      <ProtectedRoute>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-500">Error loading conversation: {messagesError}</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <MarkdownMessage
              key={m.id}
              content={m.content}
              role={m.role}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>
    </ProtectedRoute>
  );
}
