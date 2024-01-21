import { prisma } from "@/db";
import { chain1, parser1 } from "@/lib/ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  /*
    Input
    name (of prof): string
    course: string

    Output
    pros: string[]
    cons: string[]
    prerequisites: string[]
  */
  const { name, course } = await req.json();

  const courseDescription = await prisma.course.findFirst({
    where: { title: course },
    select: { description: true },
  });

  if (courseDescription === null)
    return NextResponse.json({ error: "Course not found", status: 404 });

  const profComments = await prisma.professor.findFirst({
    where: {
      name,
    },
    select: {
      comments: true,
    },
  });

  if (profComments === null)
    return NextResponse.json({ error: "Professor not found", status: 404 });

  // return NextResponse.json({ pros: [], cons: [], prerequisites: [] });

  try {
    const aiResponse = await chain1.invoke({
      name: name ?? "",
      course: course ?? "",
      description: courseDescription.description ?? "",
      reviews: profComments.comments.join("Review:") ?? "",
      format_instructions: parser1.getFormatInstructions(),
    });

    return NextResponse.json(aiResponse);
  } catch (e) {
    return NextResponse.json({ pros: [], cons: [], prerequisites: [] });
  }
}
