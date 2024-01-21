"use client";
import ProfessorChoice from "@/components/ProfessorChoice";
import ProfessorStats from "@/components/ProfessorStats";
import { APP_URL } from "@/config";
import { Course, Professor } from "@/types/model";
import { useEffect, useState } from "react";

export default function Evaluate() {
  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<string>("");
  const [professorSelected, setProfessorSelected] = useState<
    Professor | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${APP_URL}/api/courses`);

        const courses: Course[] = await res.json();
        setData(courses);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    fetchData().then(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <>
      <div
        className={
          "flex gap-5 max-w-[1200px] mt-10 mx-auto px-[25px] justify-between"
        }
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
    </>
  );
}
