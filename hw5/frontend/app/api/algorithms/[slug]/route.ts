import { NextResponse } from "next/server";

import { getAlgorithm } from "../../../../lib/algorithms";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const algorithm = getAlgorithm(slug);
  if (!algorithm) {
    return NextResponse.json({ detail: "Algorithm not found" }, { status: 404 });
  }
  return NextResponse.json(algorithm);
}
