"use client";
import { v4 as uuid } from "uuid";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Redirect to a new chat when user is authenticated
        const chatId = uuid();
        console.log('User authenticated, redirecting to chat:', chatId);
        router.push(`/${chatId}`);
      } else {
        // If not authenticated, redirect to signin
        console.log('User not authenticated, redirecting to signin');
        router.push("/auth/signin");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Redirecting...</div>
    </div>
  );
}
