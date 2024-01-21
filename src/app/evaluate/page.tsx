import ProfessorChoice from "@/components/ProfessorChoice";
import ProfessorStats from "@/components/ProfessorStats";
import { Course } from "@/types/model";

async function getData() {
  const baseUrl = process.env.VERCEL_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/courses`);

  const courses: Course[] = await res.json();

  return courses;
}

export default async function Evaluate() {
  const data = await getData();

  return (
    <>
      <div>
        <ProfessorChoice courses={data} />
        <ProfessorStats />
      </div>
    </>
  );
}
