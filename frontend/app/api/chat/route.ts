import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const body = await req.text(); // already JSON‑encoded by client
  const res = await fetch(`${backend}/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  return new NextResponse(res.body, {
    headers: { "Content-Type": "text/event-stream" },
  });
}

/* optional: tiny GET handler that returns conversations list
   The FastAPI side must implement /chat?conversations=1 to serve JSON. */
export async function GET() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const res = await fetch(`${backend}/chat?conversations=1`);
  return new NextResponse(res.body, { headers: { "Content-Type": "application/json" } });
}
