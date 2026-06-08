import { NextResponse } from "next/server";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const response = await fetch(`${backendUrl}/api/chat/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({
      reply: "後端聊天服務尚未啟動。請先啟動 FastAPI，或稍後再試。",
      suggested_questions: [],
      assistant_state: "confused"
    });
  }
}
