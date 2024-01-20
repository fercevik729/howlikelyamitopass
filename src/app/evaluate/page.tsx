import {Typography} from "@mui/material";
import ProfessorChoice from "@/components/ProfessorChoice";
import { promises as fs } from 'fs';
import {Course} from "@/types/model";

async function getData() {
  const file = await fs.readFile(process.cwd() + '/src/app/sample.json', 'utf8');

  const data = JSON.parse(file);
  const courses: Course[] = [];

  // TEMP
  for (const dataKey in data) {
    const course: Course = {
      id: dataKey,
      ...data[dataKey]
    };
    courses.push(course);
  }

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }

  return courses;
}

export default async function Evaluate() {
  const data = await getData();

  return (
    <>
      <ProfessorChoice courses={data} />
    </>
  );
}