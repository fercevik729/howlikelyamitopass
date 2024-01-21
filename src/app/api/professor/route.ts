import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, tags, rating, wouldRepeat, difficulty, comments } =
    await req.json();

  const { id } = await prisma.professor.update({
    where: {
      name,
    },
    data: {
      name,
      tags,
      rating: rating === undefined ? 0.0 : parseFloat(rating.trim()),
      wouldRepeat:
        wouldRepeat === undefined ? 0.0 : parseFloat(wouldRepeat.trim()),
      difficulty:
        difficulty === undefined ? 0.0 : parseFloat(difficulty.trim()),
      comments: comments ?? [],
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json({ professorID: id });
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  const professor = await prisma.professor.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(professor);
}
