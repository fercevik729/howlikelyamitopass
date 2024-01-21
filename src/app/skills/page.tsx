"use client";

import React, { Suspense, useEffect, useState } from "react";
import SkillsComponent from "@/components/SkillsComponent";
import { redirect, useSearchParams } from "next/navigation";
import Fade from "@mui/material/Fade";
import { CircularProgress } from "@mui/material";
import { APP_URL } from "@/config";
import Link from "next/link";
import { Button } from "@mui/material";

function Skills() {
  const searchParams = useSearchParams();
  const Class = searchParams.get("course");
  const Professor = searchParams.get("professor");
  if (!Class || !Professor) {
    console.error(`Error: Class or professor not provided as search parameter`);
    redirect("/evaluate");
  }

  /*
        To-do:
        - Use Class and Professor to obtain SKILLS
    */

  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [num, setNum] = useState(0);
  const [shown, setShown] = useState(false);
  const [done, setDone] = useState(false);
  const [goback, setGoback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [skills, setSkills] = useState([
    {
      question: "",
      options: [""],
      circles: false,
    },
  ]);
  const [pros, setPros] = useState<string[]>([]);
  const [cons, setCons] = useState<string[]>([]);
  const [prerequisites, setPrerequisites] = useState<string[]>([]);

  useEffect(() => {
    if (!loading) return;
    setLoading(false);
    const getProsCons = async () => {
      try {
        // console.error('Getting pros and cons');
        const res = await fetch(`${APP_URL}/api/ai/info`, {
          method: "POST",
          body: JSON.stringify({ name: Professor, course: Class }),
        });
        // const ret = await res.json();
        // console.log(ret);
        const { pros, cons, prerequisites } = await res.json();
        // console.error('Pros', pros);
        // console.error('Cons', cons);
        // console.error('Prereqs', prerequisites);
        setPros(pros);
        setCons(cons);
        setPrerequisites(prerequisites);
        setLoading2(true);
      } catch (err) {
        console.error(err);
      }
    };
    getProsCons();
  }, [loading, Class, Professor]);
  useEffect(() => {
    if (!loading2) return;
    setLoading2(false);
    const getQuestions = async () => {
      try {
        const res = await fetch(`${APP_URL}/api/ai/questions`, {
          method: "POST",
          body: JSON.stringify({ prerequisites, pros, cons }),
        });
        const { questions } = await res.json();
        // console.error('Questions', questions);
        setQuestions(questions);
      } catch (err) {
        console.error(err);
      }
    };
    getQuestions();
  }, [loading2, cons, prerequisites, pros]);
  useEffect(() => {
    if (questions.length === 0 || skills.length > 1 || loaded) return;
    setLoaded(true);
    const survey = [{ question: "", options: [""], circles: false }];
    survey.pop();
    questions.forEach((query) => {
      const qs = query.split("\n");
      qs.forEach((q) => {
        if (q.length < 10) return;
        if (q.charCodeAt(0) > 47 && q.charCodeAt(0) < 58) q = q.slice(3);
        if (q[0] === " ") q = q.slice(1);
        if (
          q.includes("A-F") ||
          q.includes("grade") ||
          (q.includes("scale") && q.includes("F"))
        ) {
          survey.push({
            question: q,
            options: ["A", "B", "C", "D", "F"],
            circles: true,
          });
        } else if (q.includes("1") && q.includes("5")) {
          survey.push({
            question: q,
            options: ["1", "2", "3", "4", "5"],
            circles: true,
          });
        } else if (q.includes("1") && q.includes("10")) {
          survey.push({
            question: q,
            options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            circles: true,
          });
        } else if (q.includes("How")) return;
        else {
          survey.push({
            question: q,
            options: ["Yes", "No"],
            circles: false,
          });
        }
      });
    });
    setSkills(survey);
  }, [questions, skills, loaded]);
  // useEffect(() => {
  //   if (done) {
  //     // redirect('/results');
  //     redirect(`/results?questions=${questions.join(';;;')}&answers=${answers.join(';;;')}&pros=${pros.join(';;;')}&cons=${cons.join(';;;')}`);
  //   }
  // }, [done]);
  useEffect(() => {
    if (goback) redirect("/evaluate");
  }, [goback]);

  const handleChoose = (option: string) => {
    if (answers.length + 1 === skills.length) {
      setDone(true);
    }
    setAnswers([...answers, option]);
    setShown(false);
  };
  const handleSkip = () => {
    if (answers.length + 1 === skills.length) {
      setDone(true);
    }
    setAnswers([...answers, ""]);
    setShown(false);
  };
  const handleBack = () => {
    if (answers.length === 0) {
      setGoback(true);
    }
    setShown(false);
    const a = answers;
    a.pop();
    setAnswers(a);
  };
  useEffect(() => {
    if (shown) return;
    const timer = setTimeout(() => {
      setNum(answers.length);
      setShown(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [shown, answers.length]);

  return (
    <main>
      <section id={"hero"} className={`flex flex-col py-12 items-center`}>
        <p className="text-2xl mb-8 text-center font-bold">{`${Class} - ${Professor}`}</p>
        <Fade in={shown} timeout={{ enter: 300, exit: 300 }}>
          {!done ? (
            <div>
              {!(loading || loading2 || !loaded) && (
                <SkillsComponent
                  question={skills[num].question}
                  options={skills[num].options}
                  circles={skills[num].circles}
                  handleChoose={handleChoose}
                  handleBack={handleBack}
                  handleSkip={handleSkip}
                />
              )}
              {(loading || loading2 || !loaded) && (
                <CircularProgress color="inherit" />
              )}
            </div>
          ) : (
            <Link
              href={{
                pathname: "/results",
                query: {
                  questions: questions.join(";;;"),
                  answers: answers.join(","),
                  course: Class,
                  professor: Professor,
                  pros: pros.join(";;;"),
                  cons: cons.join(";;;"),
                },
              }}
            >
              <Button
                variant="outlined"
                style={{
                  color: "white",
                  borderColor: "white",
                }}
              >
                See Results
              </Button>
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
