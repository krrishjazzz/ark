import { NextResponse } from "next/server";
import { getCMS } from "@/lib/cms";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const result = await getCMS().submitCustomOrder(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Custom order error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
