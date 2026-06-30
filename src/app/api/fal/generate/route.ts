import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!process.env.FAL_KEY) {
    return NextResponse.json(
      {
        ok: false,
        error: "FAL_KEY is not configured. Add it in Vercel and .env.local.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    status: "ready_for_fal",
    prompt:
      body?.prompt ??
      "Premium ecommerce product image for high-end artist paint brushes.",
  });
}
