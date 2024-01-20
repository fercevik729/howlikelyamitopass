import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, tags, rating, wouldRepeat, difficulty, comments } =
    await req.json();

  const { id } = await prisma.professor.create({
    data: {
      name,
      tags,
      rating: parseFloat(rating.trim()),
      wouldRepeat: parseFloat(wouldRepeat.trim()),
      difficulty: parseFloat(difficulty.trim()),
      comments,
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json({ professorId: id });
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
