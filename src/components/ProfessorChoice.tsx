"use client";
import {Course, CourseOffer} from "@/types/model";
import {Button, Typography} from "@mui/material";
import {useState} from "react";

interface ProfessorChoiceProps {
  courses: Course[];
}

export default function ProfessorChoice({courses}: ProfessorChoiceProps) {
  // Seperate the courses into groups by quarter year
  const coursesByQuarterYear: {[key: string]: Course[]} = {};
  const [quarterSelected, setQuarterSelected] = useState<string>('');
  const [courseSelected, setCourseSelected] = useState<Course>()
  const [professorSelected, setProfessorSelected] = useState<string>('')

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
        <div>
            <h1>ProfessorChoice</h1>
          <div className={"flex gap-6"}>
            <ul className={"flex flex-col gap-3"}>
              {Object.keys(coursesByQuarterYear).map((quarterYear: string) => {
                return (
                  <li key={quarterYear}>
                    <Button variant={"contained"} style={{
                      backgroundColor: quarterSelected === quarterYear ? 'green' : 'white',
                      color: quarterSelected === quarterYear ? 'white' : 'black',
                    }} onClick={() => setQuarterSelected(quarterYear)}>
                      {quarterYear}
                    </Button>
                  </li>
                )
              })}
            </ul>
            <ul className={"flex flex-col gap-3"}>
              {quarterSelected && coursesByQuarterYear[quarterSelected].map((course: Course) => {
                return (
                  <li key={course.id}>
                    <Button
                      variant={"outlined"}
                      style={{
                        backgroundColor: courseSelected?.id === course.id ? 'red' : 'white',
                        color: courseSelected?.id === course.id ? 'white' : 'black',
                      }}
                      onClick={() => setCourseSelected(course)
                      }>{course.id}</Button>
                  </li>
                )
              })}
            </ul>

            <div>
              {courseSelected && courseSelected.offered.map((offer: CourseOffer) => {
                if (offer.quarter === quarterSelected) {
                  return (
                    <ul　className={"flex flex-col gap-3"} key={offer.quarter}>
                      {offer.professors.map((professor: string, index: number) => {
                        return (
                          <li key={`${professor}-${index}-${offer.quarter}`}>
                            <Button
                              variant={"outlined"}
                              style={{
                                backgroundColor: professorSelected === professor ? 'blue' : 'white',
                                color: professorSelected === professor ? 'white' : 'black',
                              }}
                              onClick={() => setProfessorSelected(professor)
                              }>{professor}</Button>
                          </li>
                        )
                      })}
                    </ul>
                  )
                }
              })}
            </div>
          </div>
        </div>
    )
}