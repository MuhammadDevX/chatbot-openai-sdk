"use client";
import { useState, useEffect, useRef } from "react";

export function useChatStream(
  prompt: string | null,
  userId: string,
  convId: string
) {
  const [assistant, setAssistant] = useState("");
  const processingRef = useRef(false);

  useEffect(() => {
    console.log('useChatStream effect running:', { prompt, userId, convId, processing: processingRef.current });

    if (!prompt || !userId) {
      setAssistant("");
      processingRef.current = false;
      return;
    }

    // Prevent multiple simultaneous requests
    if (processingRef.current) {
      console.log('Already processing, skipping');
      return;
    }

    // Reset assistant state when new prompt is sent
    setAssistant("");
    processingRef.current = true;

    const controller = new AbortController();
    const send = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const headers: Record<string, string> = { "Content-Type": "application/json" };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch("/api/chat/stream", {
          method: "POST",
          headers,
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
          buffer += chunk;

          // Process complete lines
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Keep incomplete line in buffer

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6); // Remove 'data: ' prefix
              if (data && data !== '[DONE]') {
                setAssistant((prev) => prev + data);
              }
            }
          }
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Stream error:', error);
        }
      } finally {
        processingRef.current = false;
      }
    };

    send();
    return () => {
      controller.abort();
      processingRef.current = false;
    };
  }, [prompt, userId, convId]);

  return assistant;
}
