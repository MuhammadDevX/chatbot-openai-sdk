import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const body = await req.text(); // already JSON‑encoded by client
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
    headers: { "Content-Type": "text/event-stream" },
  });
}

/* optional: tiny GET handler that returns conversations list
   The FastAPI side must implement /chat?conversations=1 to serve JSON. */
export async function GET(req: NextRequest) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const authHeader = req.headers.get('authorization');

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (authHeader) {
    headers["Authorization"] = authHeader;
  }

  const res = await fetch(`${backend}/chat?conversations=1`, {
    headers,
  });
  return new NextResponse(res.body, { headers: { "Content-Type": "application/json" } });
}
