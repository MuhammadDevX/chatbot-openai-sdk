import "@/app/globals.css";
import { ReactNode } from "react";
import { QueryClientProvider } from "@/hooks/useQueryClient";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen flex overflow-hidden">
        <QueryClientProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
