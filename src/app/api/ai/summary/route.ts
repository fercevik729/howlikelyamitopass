import { chain3, parser3 } from "@/lib/ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { questions, answers, course, professor } = await req.json();

  return NextResponse.json(
    await chain3.invoke({
      questions: questions ?? [],
      answers: answers ?? [],
      course: course ?? "",
      professor: professor ?? "",
      format_instructions: parser3.getFormatInstructions(),
    }),
  );
}
