import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, description, units, offered } = await req.json();

  const { id } = await prisma.course.create({
    data: {
      title,
      description,
      units: parseInt(units.trim()),
      offered: {
        createMany: {
          data: offered.map((o: any) => ({
            quarter: o.quarter,
            professors: {
              createMany: {
                data: o.professors.map((p: any) => ({
                  name: p.name,
                })),
              },
            },
          })),
        },
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
