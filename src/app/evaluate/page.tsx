"use client";
import ProfessorChoice from "@/components/ProfessorChoice";
import ProfessorStats from "@/components/ProfessorStats";
import { APP_URL } from "@/config";
import { Course } from "@/types/model";
import { useEffect, useState } from "react";

export default function Evaluate() {
  const [data, setData] = useState<Course[]>([]);
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
    <>
      <div>
        <ProfessorChoice courses={data} />
        <ProfessorStats />
      </div>
    </>
  );
}
