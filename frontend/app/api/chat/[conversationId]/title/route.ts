import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
  }

  const res = await fetch(`${backend}/chat/${params.conversationId}/title`, {
    method: "POST",
    headers: {
      "Authorization": authHeader,
      "Content-Type": "application/json"
    },
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
} 