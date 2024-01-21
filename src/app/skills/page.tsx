"use client";

import React, { Suspense, useEffect, useState } from "react";
import SkillsComponent from "@/components/skills";
import { redirect, useSearchParams } from "next/navigation";
import Fade from "@mui/material/Fade";
import Link from "next/link";

const questions = [
  "What grade did you get in CSE 13S?",
  "On a scale from 1-10, how familiar are you with C++?",
];

function Skills() {
  const searchParams = useSearchParams();
  const course = searchParams.get("course");
  const professor = searchParams.get("professor");
  if (!course || !professor) {
    console.error(`Error: Class or professor not provided as search parameter`);
    redirect("/evaluate");
  }

  /*
        To-do:
        - Use Class and Professor to obtain SKILLS
    */

  const [answers, setAnswers] = useState<string[]>([]);
  const [num, setNum] = useState(0);
  const [shown, setShown] = useState(false);
  const [done, setDone] = useState(false);
  const [goback, setGoback] = useState(false);

  useEffect(() => {});
  useEffect(() => {
    if (goback) redirect("/evaluate");
  }, [goback]);

  const handleChoose = (option: string) => {
    const a = answers;
    a.push(option);
    setAnswers(a);
    console.log("answers: ", a);
    if (a.length === questions.length) {
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
  useEffect(() => {
    if (shown) return;
    const timer = setTimeout(() => {
      setNum(answers.length);
      setShown(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [shown, answers.length]);

  return (
    <main>
      <section id={"hero"} className={`flex flex-col py-36 items-center`}>
        <p className="text-2xl mb-8 text-center">{`${course} - ${professor}`}</p>
        <Fade in={shown} timeout={{ enter: 300, exit: 300 }}>
          {!done ? (
            <div>
              <SkillsComponent
                question={questions[num]}
                options={["Low", "Medium", "High"]}
                circles={false}
                handleChoose={handleChoose}
                handleBack={handleBack}
                handleSkip={handleSkip}
              />
            </div>
          ) : (
            <Link
              href={{
                pathname: "/results",
                query: {
                  questions: questions.join(";;;"),
                  answers: answers.join(","),
                  course,
                  professor,
                },
              }}
            >
              See Results
            </Link>
          )}
        </Fade>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Skills />
    </Suspense>
  );
}
