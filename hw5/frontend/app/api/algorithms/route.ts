import { NextResponse } from "next/server";

import { getAlgorithms } from "../../../lib/algorithms";

export async function GET() {
  return NextResponse.json(getAlgorithms());
}
