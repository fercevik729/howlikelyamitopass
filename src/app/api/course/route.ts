import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, description, units, offered } = await req.json();

  let offeredIds: number[] = [];
  for (const o of offered) {
    const { id } = await prisma.quarterOffered.create({
      data: {
        quarter: o.quarter,
        professors: {
          connectOrCreate: o.professors.map((p: string) => {
            return {
              where: {
                name: p,
              },
              create: {
                name: p,
              },
            };
          }),
        },
      },
    });

    offeredIds = [...offeredIds, id];
  }

  const { id } = await prisma.course.create({
    data: {
      title,
      description,
      units: parseInt(units.trim()),
      offered: {
        connect: offeredIds.map((id) => ({ id })),
      },
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json({ courseId: id });
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const course = await prisma.course.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      offered: true,
    },
  });

  return NextResponse.json(course);
}
