import { prisma } from "@/db";
import { NextResponse } from "next/server";

const isAlpha = function (ch: string) {
  return /^[A-Z]$/i.test(ch);
};

const compareCoursesByNum = function (a: string, b: string): number {
  // Check departments first
  // Check course numbers
  const aNum = parseInt(a.replace(/[A-Z]/g, ""));
  const bNum = parseInt(b.replace(/[A-Z]/g, ""));

  if (aNum > bNum) return 1;
  if (bNum > aNum) return -1;

  // Check letters for cases like 115A and 115B
  const aLastChar = a[a.length - 1];
  const aLet = isAlpha(aLastChar) ? aLastChar : "";

  const bLastChar = b[b.length - 1];
  const bLet = isAlpha(bLastChar) ? bLastChar : "";

  if (aLet == "" && bLet == "") return 0;
  if (aLet == "") return -1;
  if (bLet == "") return 1;

  if (aLet > bLet) return 1;
  if (bLet > aLet) return -1;

  return 0;
};

export async function GET() {
  // Get all the courses with the professors
  const res = await prisma.course.findMany({
    include: {
      offered: {
        include: {
          professors: true,
        },
      },
    },
  });

  // sort by numbers
  res.sort((a, b) => compareCoursesByNum(a.title, b.title));
  return NextResponse.json(res);
}
