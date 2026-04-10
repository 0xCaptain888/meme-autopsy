import { NextRequest, NextResponse } from "next/server";
import { refreshMarketForProject } from "@/lib/sources/dexscreener";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const snapshot = await refreshMarketForProject(id);

    if (!snapshot) {
      return NextResponse.json(
        { ok: false, error: "REFRESH_MARKET_FAILED", details: "No market data returned" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      snapshot,
      provenance: ["DexScreener"],
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[refresh-market] error:", message);
    return NextResponse.json(
      { ok: false, error: "REFRESH_MARKET_FAILED", details: message },
      { status: 500 }
    );
  }
}
