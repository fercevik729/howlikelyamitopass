import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, description, units, offered } = await req.json();

  const result = await prisma.$transaction(async (tx) => {
    let offeredIds: number[] = [];
    for (const o of offered) {
      const { id } = await tx.quarterOffered.create({
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

    const { id } = await tx.course.create({
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

    return { courseId: id };
  });

  return NextResponse.json(result);
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
