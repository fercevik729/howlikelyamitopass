"use client";
import Image from "next/image";
import { Button } from "@mui/material";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);
  return (
    <main>
      <section
        id={"hero"}
        className={`flex items-center justify-center h-screen`}
      >
        <div className={"flex flex-col gap-[56px] text-white text-right"}>
          <h1 className={"text-8xl font-bold"}>How Can I Pass?</h1>
          <span className={"text-xl"}>
            The answers that CS majors are looking for.
          </span>
          <Link href={"/evaluate"} passHref>
            <Button
              style={{
                backgroundColor: "white",
                color: "black",
                padding: "12px 40px",
                borderRadius: "25px",
                opacity: 0.7,
              }}
              className={"w-fit"}
              variant={"contained"}
              color={"secondary"}
            >
              Get Started
            </Button>
          </Link>
        </div>
        <div className={"ml-left"}>
          <Image
            className={"ml-5"}
            src={"/spaceship.svg"}
            alt={"spaceship"}
            width={500}
            height={500}
          />
        </div>
      </section>
    </main>
  );
}
