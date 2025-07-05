"use client";
import { useState, useEffect } from "react";

export function useChatStream(
  prompt: string | null,
  userId: string,
  convId: string
) {
  const [assistant, setAssistant] = useState("");

  useEffect(() => {
    if (!prompt) {
      setAssistant("");
      return;
    }

    // Reset assistant state when new prompt is sent
    setAssistant("");

    const controller = new AbortController();
    const send = async () => {
      try {
        const res = await fetch("/api/chat/stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, user_id: userId, conv_id: convId }),
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          console.log('Raw chunk received:', chunk); // Debug log
          buffer += chunk;

          // Process complete lines
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Keep incomplete line in buffer

          for (const line of lines) {
            console.log('Processing line:', line); // Debug log
            if (line.startsWith('data: ')) {
              const data = line.slice(6); // Remove 'data: ' prefix
              console.log('Extracted data:', data); // Debug log
              if (data && data !== '[DONE]') {
                console.log('Setting assistant with:', data); // Debug log
                setAssistant((prev) => prev + data);
              }
            }
          }
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Stream error:', error);
        }
      }
    };

    send();
    return () => controller.abort();
  }, [prompt, userId, convId]);

  return assistant;
}
