import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="flex-1 flex flex-col">{children}</main>
    </>
  );
}
