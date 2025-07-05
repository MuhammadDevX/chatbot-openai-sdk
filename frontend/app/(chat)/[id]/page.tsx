"use client";
import { use, useMemo, useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { useChatStream } from "@/hooks/useChatStream";
import ChatInput from "@/components/ChatInput";
import MarkdownMessage from "@/components/MarkdownMessage";

interface Msg {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatRoom({ params }: { params: Promise<{ id: string }> }) {
  const { id: convId } = use(params);
  const userId = "123"; // substitute your real user auth ID
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const assistantDelta = useChatStream(pendingPrompt, userId, convId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle streaming assistant response
  useEffect(() => {
    if (assistantDelta && pendingPrompt) {
      setIsLoading(true);
      setMsgs(prevMsgs => {
        const newMsgs = [...prevMsgs];
        const lastMsg = newMsgs[newMsgs.length - 1];

        // If the last message is from assistant, update it
        if (lastMsg && lastMsg.role === "assistant") {
          lastMsg.content = assistantDelta;
        } else {
          // Add new assistant message
          newMsgs.push({
            id: "assistant-" + Date.now(),
            role: "assistant",
            content: assistantDelta
          });
        }
        return newMsgs;
      });
    }
  }, [assistantDelta, pendingPrompt]);

  // Clear loading state when we have a response
  useEffect(() => {
    if (assistantDelta && pendingPrompt) {
      setIsLoading(false);
    }
  }, [assistantDelta, pendingPrompt]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function handleSend(text: string) {
    if (!text.trim()) return;

    // Clear any previous pending prompt
    setPendingPrompt(null);

    // Add user message
    setMsgs(prevMsgs => [...prevMsgs, {
      id: uuid(),
      role: "user",
      content: text
    }]);

    // Start streaming
    setPendingPrompt(text);
    setIsLoading(true);
  }

  return (
    <div className="flex-1 flex flex-col overflow-scroll">
      <div className="flex-1 overflow-y-scroll p-4 space-y-4">
        {msgs.map((m) => (
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
  );
}
