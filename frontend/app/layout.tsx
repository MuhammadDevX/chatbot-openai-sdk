import "@/app/globals.css";
import { ReactNode } from "react";
import { QueryClientProvider } from "@/hooks/useQueryClient";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen flex overflow-hidden bg-[linear-gradient(135deg,_#f5f7fa_0%,_#c3cfe2_100%)]">
        <QueryClientProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
