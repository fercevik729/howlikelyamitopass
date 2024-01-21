"use client";
import { Course, CourseOffer } from "@/types/model";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProfessorChoiceProps {
  courses: Course[];
}

export default function ProfessorChoice({ courses }: ProfessorChoiceProps) {
  const router = useRouter();
  // Seperate the courses into groups by quarter year
  const coursesByQuarterYear: { [key: string]: Course[] } = {};
  const [quarterSelected, setQuarterSelected] = useState<string>("");
  const [courseSelected, setCourseSelected] = useState<Course>();
  const [professorSelected, setProfessorSelected] = useState<string>("");

  courses.forEach((course: Course) => {
    const quartersOffered: CourseOffer[] = course.offered;
    quartersOffered.forEach((quarterOffered: CourseOffer) => {
      const quarterYear = quarterOffered.quarter;
      if (!coursesByQuarterYear[quarterYear]) {
        coursesByQuarterYear[quarterYear] = [];
      }
      coursesByQuarterYear[quarterYear].push(course);
    });
  });

  return (
    <div className={"max-w-[1000px] mt-16 mx-auto px-[25px]"}>
      <div className={"flex flex-col gap-6"}>
        <ul className={"flex gap-3"}>
          {Object.keys(coursesByQuarterYear).map((quarterYear: string) => {
            return (
              <li key={quarterYear}>
                <Button
                  variant={"outlined"}
                  style={{
                    backgroundColor:
                      quarterSelected === quarterYear ? "white" : "transparent",
                    color: quarterSelected === quarterYear ? "black" : "white",
                    border: "1px solid white",
                    borderRadius: "10px",
                  }}
                  onClick={() => setQuarterSelected(quarterYear)}
                >
                  {quarterYear}
                </Button>
              </li>
            );
          })}
        </ul>
        <div className={"flex gap-16"}>
          <div>
            <Typography variant={"h6"}>Classes</Typography>
            <ul className={"flex flex-col gap-3 h-[60vh] overflow-scroll px-3"}>
              {quarterSelected &&
                coursesByQuarterYear[quarterSelected].map((course: Course) => {
                  return (
                    <li key={course.id}>
                      <Button
                        variant={"outlined"}
                        style={{
                          backgroundColor:
                            courseSelected?.id === course.id
                              ? "white"
                              : "transparent",
                          color:
                            courseSelected?.id === course.id
                              ? "black"
                              : "white",
                          border: "1px solid white",
                          borderRadius: "10px",
                          width: "100%",
                        }}
                        onClick={() => setCourseSelected(course)}
                      >
                        {course.id}
                      </Button>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div>
            <Typography variant={"h6"}>Professors</Typography>
            {courseSelected &&
              courseSelected.offered.map((offer: CourseOffer) => {
                if (offer.quarter === quarterSelected) {
                  return (
                    <ul className={"flex flex-col gap-3"} key={offer.quarter}>
                      {offer.professors.map(
                        (professor: string, index: number) => {
                          return (
                            <li key={`${professor}-${index}-${offer.quarter}`}>
                              <Button
                                variant={"outlined"}
                                style={{
                                  backgroundColor:
                                    professorSelected === professor
                                      ? "white"
                                      : "transparent",
                                  color:
                                    professorSelected === professor
                                      ? "black"
                                      : "white",
                                  border: "1px solid white",
                                  borderRadius: "10px",
                                  width: "100%",
                                }}
                                onClick={() => {
                                  setProfessorSelected(professor);
                                  router.push(
                                    `/evaluate?course=${courseSelected.id}&professor=${professor}`,
                                  );
                                }}
                              >
                                {professor}
                              </Button>
                            </li>
                          );
                        },
                      )}
                    </ul>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
