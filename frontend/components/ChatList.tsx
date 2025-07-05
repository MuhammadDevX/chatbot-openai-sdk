"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

interface Conversation {
  id: string;
  title: string;
}

async function fetchConversations(): Promise<Conversation[]> {
  const res = await fetch("/api/chat?conversations=1");
  return res.json();
}

export default function ChatList() {
  const { data } = useQuery({ queryKey: ["conversations"], queryFn: fetchConversations });

  return (
    <ul className="space-y-1">
      {data && data?.length > 0 && data?.map((c) => (
        <li key={c.id}>
          <Link
            href={`/${c.id}`}
            className="block rounded px-3 py-2 hover:bg-muted"
          >
            {c.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
