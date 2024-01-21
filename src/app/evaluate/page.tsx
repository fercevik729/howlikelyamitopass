"use client";
import ProfessorChoice from "@/components/ProfessorChoice";
import ProfessorStats from "@/components/ProfessorStats";
import { APP_URL } from "@/config";
import { Course, Professor } from "@/types/model";
import { useEffect, useState } from "react";

export default function Evaluate() {
  const [data, setData] = useState<Course[]>([]);
  const [course, setCourse] = useState<string>("");
  const [professorSelected, setProfessorSelected] = useState<
    Professor | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${APP_URL}/api/courses`);

        const courses: Course[] = await res.json();
        setData(courses);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={"max-w-[1200px] mt-10 mx-auto"}>
      <p className={"text-5xl font-bold text-center"}>
        Lookup Course & Professor
      </p>
      <div
        className={"mt-16 grid grid-cols-2 gap-x-7 px-[25px] justify-between"}
      >
        <ProfessorChoice
          courses={data}
          professorSelected={professorSelected}
          setProfessorSelected={setProfessorSelected}
          setCourse={setCourse}
        />
        {professorSelected && (
          <ProfessorStats professor={professorSelected} course={course} />
        )}
        {!professorSelected && <div className={"w-[450px]"}></div>}
      </div>
    </div>
  );
}
