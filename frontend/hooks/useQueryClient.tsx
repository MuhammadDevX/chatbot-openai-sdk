"use client";
import { QueryClient, QueryClientProvider as RQProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function QueryClientProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return <RQProvider client={client}>{children}</RQProvider>;
}
