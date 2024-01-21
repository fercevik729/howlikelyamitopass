import ProfessorChoice from "@/components/ProfessorChoice";
import ProfessorStats from "@/components/ProfessorStats";
import { APP_URL } from "@/config";
import { Course } from "@/types/model";

async function getData() {
  const res = await fetch(`${APP_URL}/api/courses`);

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
