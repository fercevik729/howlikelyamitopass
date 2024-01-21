import ProfessorChoice from "@/components/ProfessorChoice";
import ProfessorStats from "@/components/ProfessorStats";

async function getData() {
  // const res = await fetch('http://localhost:3000/api/courses')
  //
  // const data = res.json();
  // const courses: Course[] = [];
  //
  // // TEMP
  // for (const dataKey in data) {
  //   const course: Course = {
  //     id: dataKey,
  //     ...data[dataKey],
  //   };
  //   courses.push(course);
  // }
  //
  // // if (!res.ok) {
  // //   // This will activate the closest `error.js` Error Boundary
  // //   throw new Error('Failed to fetch data')
  // // }
  //
  // console.log('is here')

  return [];
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
