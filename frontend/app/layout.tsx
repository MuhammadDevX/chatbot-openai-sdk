import "@/app/globals.css";
import { ReactNode } from "react";
import { QueryClientProvider } from "@/hooks/useQueryClient";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen flex overflow-hidden">
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
