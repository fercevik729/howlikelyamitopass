"use client";
import React from "react";
import ResultsPercentage from "@/components/ResultsPercentage";

export default function Results() {
  return (
    <main>
      <section id={"hero"} className={`flex flex-col py-36 items-center`}>
        <p className="text-2xl mb-8 text-center">hi</p>
        <ResultsPercentage percentage={93} />
      </section>
    </main>
  );
}
