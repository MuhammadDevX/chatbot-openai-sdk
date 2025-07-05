'use client'
import { Plus, LogOut, User } from "lucide-react";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import ChatList from "./ChatList";
import { useAuth } from "@/contexts/AuthContext";

export default function Sidebar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleNewChat = () => {
    const chatId = uuid();
    router.push(`/${chatId}`);
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/signin');
  };

  return (
    <div className="w-80 bg-gray-50 border-r flex flex-col">
      <div className="p-4 border-b">
        <button
          onClick={handleNewChat}
          className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ChatList />
      </div>

      {user && (
        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {user.name || user.email}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {user.email}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
