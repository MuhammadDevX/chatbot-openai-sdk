"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

interface Conversation {
  id: string;
  title: string;
}

async function fetchConversations(): Promise<Conversation[]> {
  const token = localStorage.getItem('auth_token');
  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch("/api/chat?conversations=1", { headers });
  return res.json();
}

export default function ChatList() {
  const { data: conversations = [] } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  return (
    <div className="p-4 space-y-2">
      {conversations && conversations.length > 0 && conversations.map((conv) => (
        <Link
          key={conv.id}
          href={`/${conv.id}`}
          className="block p-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="font-medium text-gray-900 truncate">{conv.title}</div>
        </Link>
      ))}
    </div>
  );
}
