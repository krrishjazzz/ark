import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/** POST /api/revalidate — bust CMS cache after Studio publish */
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true, revalidated: true, now: Date.now() });
}
