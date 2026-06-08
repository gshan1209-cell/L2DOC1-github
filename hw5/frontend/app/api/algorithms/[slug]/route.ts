import { NextResponse } from "next/server";

import { getAlgorithm } from "../../../../lib/algorithms";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const algorithm = getAlgorithm(params.slug);
  if (!algorithm) {
    return NextResponse.json({ detail: "Algorithm not found" }, { status: 404 });
  }
  return NextResponse.json(algorithm);
}
