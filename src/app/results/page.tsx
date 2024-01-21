"use client";
import { APP_URL } from "@/config";
import { Button, CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import ResultsPercentage from "@/components/ResultsPercentage";
import Link from "next/link";

function SurveyResponse() {
  const searchParams = useSearchParams();
  const questions = searchParams.get("questions")?.split(";;;");
  const answers = searchParams.get("answers")?.split(",");
  const course = searchParams.get("course");
  const professor = searchParams.get("professor");

  const [summary, setSummary] = useState<string>("");
  const [passRate, setPassRate] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function getReport() {
      setLoading(true);
      const res = await fetch(`${APP_URL}/api/ai/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questions,
          answers,
          professor,
          course,
        }),
      });
      const data = await res.json();
      setSummary(data.report);
      setPassRate(data.passRate);
    }

    getReport()
      .then(() => {
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return (
      <>
        <p>There was an error generating your report. Please try again.</p>
      </>
    );
  }
  return (
    <div className="flex flex-row justify-between">
      <ResultsPercentage percentage={passRate * 100} />

      <div className="flex flex-col text-wrap w-2/5 mx-36">
        <h2 className="text-2xl">Summary</h2>
        <p>{summary}</p>
      </div>

      <div className="flex flex-row text-wrap w-1/3">
        <div className="flex flex-col pr-8">
          <h2 className="text-2xl mb-2">Pros</h2>
          <p>Advice goes here</p>
          <p>asjdklae</p>
          <p>dajkdlean</p>
        </div>
        <div className="flex flex-col border-l-2 pl-8">
          <h2 className="text-2xl mb-2">Cons</h2>
          <p>Advice goes here</p>
          <p>jdlakjsdsajld</p>
          <p>askdjlajdle</p>
        </div>
      </div>
    </div>
  );
}

export default function Results() {
  return (
    <main>
      <section id={"hero"} className={`flex flex-col py-36 items-center gap-4`}>
        <h2 className="text-2xl mb-8 text-center border-b-2">Your Results</h2>
        <Suspense fallback={<CircularProgress color="primary" />}>
          <SurveyResponse />
        </Suspense>
        <Link href={"/evaluate"}>
          <Button
            variant="outlined"
            style={{
              color: "white",
              borderColor: "white",
            }}
          >
            Return to professors!
          </Button>
        </Link>
      </section>
    </main>
  );
}
