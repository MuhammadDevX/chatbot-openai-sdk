'use client'
import { Plus } from "lucide-react";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import ChatList from "./ChatList";

export default function Sidebar() {
  const router = useRouter();

  function newChat() {
    const id = uuid();
    router.push(`/${id}`);
  }

  return (
    <aside className="w-72 border-r flex flex-col">
      <header className="p-4 flex items-center justify-between">
        <h2 className="font-semibold">Chats</h2>
        <button
          onClick={newChat}
          className="p-1 hover:bg-muted rounded"
          title="New chat"
        >
          <Plus size={18} />
        </button>
      </header>
      <div className="flex-1 overflow-y-auto p-2">
        <ChatList />
      </div>
    </aside>
  );
}
