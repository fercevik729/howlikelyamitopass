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
        Credits
      </h1>
      <p
        style={{
          color: "#cff",
          fontSize: "1.25rem",
          maxWidth: "1300px",
          textAlign: "center",
        }}
      >
        The tools we used are: Next.js, React, BeautifulSoup4,
        RateMyProfessorAPI, Material UI, Langchain, Prisma, Vercel, SQL
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          padding: "20px",
          width: "100vw",
        }}
      >
        <div
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
            marginTop: "75px",
          }}
        >
          Furkan Ercevik
        </div>
        <div
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
            marginTop: "75px",
          }}
        >
          Jose Chavez
        </div>
        <div
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
            marginTop: "75px",
          }}
        >
          Daniel Chang
        </div>
        <div
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
            marginTop: "75px",
          }}
        >
          Denny Au
        </div>
        <div style={{ color: "#cff", textAlign: "center", width: "100%" }}>
          Created langchain prompts, setup database and API&apos;s, deployed to
          Vercel, and integrated backend with frontend
        </div>
        <div style={{ color: "#cff", textAlign: "center", width: "100%" }}>
          Web scraper for the BSOE website, frontend class selection page, API
          setup
        </div>
        <div style={{ color: "#cff", textAlign: "center", width: "100%" }}>
          Figma mockup of the website, frontend skills page
        </div>
        <div style={{ color: "#cff", textAlign: "center", width: "100%" }}>
          Backend web scraper for RateMyProfessor and frontend about/credits
        </div>
      </div>
    </div>
  );
}
