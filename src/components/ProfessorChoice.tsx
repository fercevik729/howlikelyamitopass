"use client";
import { Course, CourseOffer, Professor } from "@/types/model";
import { Button, Typography, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

interface ProfessorChoiceProps {
  courses: Course[];
  professorSelected: Professor | undefined;
  setProfessorSelected: any;
  setCourse: any;
}

interface CourseByQuarterYear {
  [key: string]: Course[];
}

export default function ProfessorChoice({
  courses,
  professorSelected,
  setProfessorSelected,
  setCourse,
}: ProfessorChoiceProps) {
  // Separate the courses into groups by quarter year
  const [coursesByQuarterYear, setCoursesByQuarterYear] =
    useState<CourseByQuarterYear>({});
  const [quarterSelected, setQuarterSelected] = useState<string>("");
  const [courseSelected, setCourseSelected] = useState<Course | undefined>(
    undefined,
  );

  useEffect(() => {
    const getQuarter = () => {
      const tempCoursesByQuarterYear: CourseByQuarterYear = {};
      courses.forEach((course: Course) => {
        course.offered.forEach((offer: CourseOffer) => {
          if (tempCoursesByQuarterYear[offer.quarter]) {
            tempCoursesByQuarterYear[offer.quarter].push(course);
          } else {
            tempCoursesByQuarterYear[offer.quarter] = [course];
          }
        });
      });
      setCoursesByQuarterYear(tempCoursesByQuarterYear);
    };
    getQuarter();
  }, [courses]);

  return (
    <div className={"w-max justify-self-end"}>
      <div className={"flex flex-col gap-6"}>
        <ul className={"flex gap-3"}>
          {courses.length > 0
            ? Object.keys(coursesByQuarterYear).map((quarterYear: string) => {
                return (
                  <li key={quarterYear}>
                    <Button
                      variant={"outlined"}
                      style={{
                        backgroundColor:
                          quarterSelected === quarterYear
                            ? "white"
                            : "transparent",
                        color:
                          quarterSelected === quarterYear ? "black" : "white",
                        border: "1px solid white",
                        borderRadius: "10px",
                      }}
                      onClick={() => {
                        setQuarterSelected(quarterYear);
                        setCourseSelected(undefined);
                        setCourse("");
                        setProfessorSelected(undefined);
                      }}
                    >
                      {quarterYear}
                    </Button>
                  </li>
                );
              })
            : [...Array(4)].map((_, i) => (
                <li key={`skeleton ${i}`}>
                  <Skeleton
                    variant={"rounded"}
                    width={100}
                    height={30}
                    animation="pulse"
                    sx={{
                      bgcolor: "#60a5fa",
                    }}
                  />
                </li>
              ))}
        </ul>
        <div className={"flex gap-16"}>
          <div>
            <Typography variant={"h6"}>Classes</Typography>
            <ul className={"flex flex-col gap-3 h-[60vh] overflow-scroll px-3"}>
              {quarterSelected &&
                coursesByQuarterYear[quarterSelected].map((course: Course) => {
                  return (
                    <li key={`${quarterSelected}-${course.id}`}>
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
                        onClick={() => {
                          setCourseSelected(course);
                          setCourse(course.title);
                          setProfessorSelected(undefined);
                        }}
                      >
                        {course.title}
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
                      {offer.professors.map((professor: Professor) => {
                        return (
                          <li key={`${quarterSelected}-${professor.id}`}>
                            <Button
                              variant={"outlined"}
                              style={{
                                backgroundColor:
                                  professorSelected?.name === professor.name
                                    ? "white"
                                    : "transparent",
                                color:
                                  professorSelected?.name === professor.name
                                    ? "black"
                                    : "white",
                                border: "1px solid white",
                                borderRadius: "10px",
                                width: "100%",
                              }}
                              onClick={() => {
                                setProfessorSelected(professor);
                              }}
                            >
                              {professor.name}
                            </Button>
                          </li>
                        );
                      })}
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
