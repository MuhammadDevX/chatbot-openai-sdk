// src/app/api/chat/stream/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const body = await req.text();
  const authHeader = req.headers.get('authorization');

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (authHeader) {
    headers["Authorization"] = authHeader;
  }

  const res = await fetch(`${backend}/chat/stream`, {
    method: "POST",
    headers,
    body,
  });

  return new NextResponse(res.body, {
    status: res.status,
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
}
