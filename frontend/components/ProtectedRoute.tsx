"use client";
import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('ProtectedRoute - user:', user, 'loading:', loading);
    if (!loading && !user) {
      console.log('ProtectedRoute - redirecting to signin');
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  if (loading) {
    console.log('ProtectedRoute - showing loading');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    console.log('ProtectedRoute - no user, returning null');
    return null; // Will redirect to signin
  }

  console.log('ProtectedRoute - rendering children');
  return <>{children}</>;
} 