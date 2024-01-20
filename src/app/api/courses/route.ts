import { prisma } from "@/db";

export async function GET() {
  // Get all the courses with the professors
  return await prisma.course.findMany({
    include: {
      offered: {
        include: {
          professors: true,
        },
      },
    },
  });
}
