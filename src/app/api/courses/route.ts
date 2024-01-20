import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  // Get all the courses with the professors
  return NextResponse.json(
    await prisma.course.findMany({
      include: {
        offered: {
          include: {
            professors: true,
          },
        },
      },
    }),
  );
}
