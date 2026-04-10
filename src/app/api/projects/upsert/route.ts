import { NextRequest, NextResponse } from "next/server";
import { projectUpsertInputSchema } from "@/lib/validation/zod";
import { upsertProject } from "@/db/queries";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = projectUpsertInputSchema.safeParse(body);

    if (!parsed.success) {
      const issues = parsed.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ");
      return NextResponse.json(
        { ok: false, error: "PROJECT_UPSERT_FAILED", details: issues },
        { status: 400 }
      );
    }

    const input = parsed.data;

    const project = await upsertProject({
      name: input.name,
      symbol: input.symbol,
      contractAddress: input.contractAddress,
      launchPlatform: input.launchPlatform,
      websiteUrl: input.websiteUrl,
      twitterUrl: input.twitterUrl,
      telegramUrl: input.telegramUrl,
    });

    return NextResponse.json({ ok: true, project });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[projects/upsert] error:", message);
    return NextResponse.json(
      { ok: false, error: "PROJECT_UPSERT_FAILED", details: message },
      { status: 400 }
    );
  }
}
