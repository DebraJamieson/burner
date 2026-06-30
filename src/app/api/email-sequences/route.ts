import { NextResponse } from "next/server";

import { communications } from "@/lib/data";

export async function GET() {
  return NextResponse.json({
    ok: true,
    sequences: communications,
  });
}
