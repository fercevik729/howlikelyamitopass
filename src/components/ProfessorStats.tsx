import { Professor } from "@/types/model";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

interface ProfessorStatsProps {
  professor: Professor;
}

export default function ProfessorStats({ professor }: ProfessorStatsProps) {
  const [index, setIndex] = useState<number>(0);

  return (
    <div className="border border-white w-[450px] py-[35px] px-[40px]">
      <div className="rating flex justify-center font-mono">
        <span className={"text-[85px]"}>{professor.rating}</span>
        <span className={"text-[40px] mt-[18px] text-[#E3D9FF]"}>/5</span>
      </div>
      <Typography
        variant={"h3"}
        className={"text-3xl text-center font-mono mb-6"}
      >
        {professor.name}
      </Typography>
      <div id="stats" className={"flex justify-between"}>
        <div
          id="difficulty"
          className={"flex flex-col justify-center font-mono"}
        >
          <span className={"text-4xl text-center"}>{professor.difficulty}</span>
          <Typography className={"text-sm font-thin"}>
            level of difficulty
          </Typography>
        </div>
        <div id="again" className={"flex flex-col justify-center font-mono"}>
          <span className={"text-4xl text-center"}>
            {professor.wouldRepeat}
          </span>
          <Typography className={"text-sm font-thin"}>
            would take it again
          </Typography>
        </div>
      </div>
      <div id="tags">
        <div className={"flex flex-wrap gap-2 mt-5 font-mono"}>
          {professor.tags.map((tag, index) => (
            <span
              key={index}
              className={
                "text-sm font-thin px-3 py-1 border border-white rounded-xl"
              }
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div id="reviews">
        <div className={"flex flex-col gap-2 mt-5 font-mono"}>
          <div className={"flex flex-col gap-2 border border-white p-3"}>
            <span className={"text-sm font-thin"}>
              {professor.comments[index]}
            </span>
          </div>
        </div>
        <div id="buttonWrapper" className={"flex mt-6 gap-5"}>
          <Button
            variant={"outlined"}
            style={{
              color: "white",
              borderColor: "white",
            }}
            onClick={() => setIndex((index - 1) % professor.comments.length)}
          >
            Prev
          </Button>
          <Button
            variant={"outlined"}
            style={{
              color: "white",
              borderColor: "white",
            }}
            onClick={() => setIndex((index + 1) % professor.comments.length)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
