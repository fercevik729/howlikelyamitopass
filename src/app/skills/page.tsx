"use client";
import React from "react";
import SkillsComponent from "@/components/skills";
import { redirect, useSearchParams } from "next/navigation";
import Fade from "@mui/material/Fade";

const SKILLS = [
  {
    question: "What grade did you get in CSE 13S?",
    options: ["A", "B", "C", "D", "F"],
    circles: true,
  },
  {
    question:
      "Across all your classes, how many hours of discussion sections/office hours do you attend each week?",
    options: ["None", "1-2", "3-5", "6-8", "9+"],
    circles: false,
  },
  {
    question: "On a scale from 1-10, how familiar are you with C++?",
    options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    circles: true,
  },
];

export default function Skills() {
  const searchParams = useSearchParams();
  const Class = searchParams.get("class");
  const Professor = searchParams.get("professor");
  if (!Class || !Professor) {
    console.error(`Error: Class or professor not provided as search parameter`);
    redirect("/evaluate");
  }

  /*
        To-do:
        - Use Class and Professor to obtain SKILLS
    */

  const [answers, setAnswers] = React.useState<string[]>([]);
  const [num, setNum] = React.useState(0);
  const [shown, setShown] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [goback, setGoback] = React.useState(false);

  React.useEffect(() => {
    if (done) redirect("/results");
  }, [done]);
  React.useEffect(() => {
    if (goback) redirect("/evaluate");
  }, [goback]);

  const handleChoose = (option: string) => {
    const a = answers;
    a.push(option);
    setAnswers(a);
    console.log("answers: ", a);
    if (a.length === SKILLS.length) {
      setDone(true);
      return;
    }
    setShown(false);
  };
  const handleSkip = () => {
    setAnswers([...answers, ""]);
    setShown(false);
  };
  const handleBack = () => {
    setShown(false);
    if (answers.length === 0) setGoback(true);
    const a = answers;
    a.pop();
    setAnswers(a);
  };
  React.useEffect(() => {
    if (shown) return;
    const timer = setTimeout(() => {
      setNum(answers.length);
      setShown(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [shown]);

  return (
    <main>
      <section id={"hero"} className={`flex flex-col py-36 items-center`}>
        <p className="text-2xl mb-8 text-center">{`${Class} - ${Professor}`}</p>
        <Fade in={shown} timeout={{ enter: 300, exit: 300 }}>
          <div>
            <SkillsComponent
              question={SKILLS[num].question}
              options={SKILLS[num].options}
              circles={SKILLS[num].circles}
              handleChoose={handleChoose}
              handleBack={handleBack}
              handleSkip={handleSkip}
            />
          </div>
        </Fade>
      </section>
    </main>
  );
}
