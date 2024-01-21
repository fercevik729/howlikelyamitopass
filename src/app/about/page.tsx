"use client";
import React, { useEffect } from "react";

export default function Results() {
  // Preventing about me to have the ability to scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20vh",
        height: "50vh",
      }}
    >
      <h1 style={{ fontSize: "8rem", fontWeight: "bold", color: "#fff" }}>
        About
      </h1>
      <p
        style={{
          color: "#cff",
          fontSize: "1.25rem",
          maxWidth: "1200px",
          textAlign: "center",
        }}
      >
        A seamless interaction from RateMyProfessor&apos;s data to AI that
        provides summarized information of the professor&apos;s teaching
        environment. Our platform also provides the UCSC course catalog as well.
        Our goal is to inform computer science undergraduates of their chances
        in passing a course and providing the information they need to succeed.
      </p>
    </div>
  );
}
