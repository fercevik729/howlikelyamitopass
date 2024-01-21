import ProfessorChoice from "@/components/ProfessorChoice";
import ProfessorStats from "@/components/ProfessorStats";
import { Course } from "@/types/model";

async function getData() {
  const res = await fetch("http://localhost:3000/api/courses");

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
