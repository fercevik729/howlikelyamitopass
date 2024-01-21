import { chain2 } from "@/lib/ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prerequisites, pros, cons } = await req.json();

  const questions = await chain2.invoke({
    prerequisites: prerequisites ?? [],
    pros: pros ?? [],
    cons: cons ?? [],
  });

  return NextResponse.json({
    questions: questions.split("\n"),
  });
}
