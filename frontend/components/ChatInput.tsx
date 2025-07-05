"use client";
import { useState } from "react";

export default function ChatInput({ 
  onSend, 
  isLoading = false 
}: { 
  onSend: (text: string) => void;
  isLoading?: boolean;
}) {
  const [value, setValue] = useState("");

  function handleSend() {
    const text = value.trim();
    if (text && !isLoading) {
      onSend(text);
      setValue("");
    }
  }

  return (
    <div className="p-3 border-t flex gap-2">
      <textarea
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
        className="flex-1 resize-none rounded border p-2"
        placeholder={isLoading ? "Assistant is typing..." : "Type a message…"}
        disabled={isLoading}
      />
      <button 
        onClick={handleSend} 
        disabled={isLoading}
        className="px-4 py-2 rounded bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
