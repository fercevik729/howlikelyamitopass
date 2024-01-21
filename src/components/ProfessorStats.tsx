import { Professor } from "@/types/model";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa6";

interface ProfessorStatsProps {
  professor: Professor;
  course: string;
}

export default function ProfessorStats({
  professor,
  course,
}: ProfessorStatsProps) {
  const [index, setIndex] = useState<number>(0);

  return (
    <div className="border border-white py-[35px] px-[40px] rounded-2xl">
      <div className="rating flex justify-center font-mono">
        <span className={"text-[85px] font-bold"}>{professor.rating}</span>
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
          className={"flex flex-col justify-center font-mono font-bold"}
        >
          <span className={"text-4xl text-center"}>{professor.difficulty}</span>
          <Typography className={"text-sm"}>level of difficulty</Typography>
        </div>
        <div id="again" className={"flex flex-col justify-center font-mono"}>
          <span className={"text-4xl text-center font-bold"}>
            {professor.wouldRepeat}%
          </span>
          <Typography className={"text-sm"}>would take it again</Typography>
        </div>
      </div>
      <div id="tags">
        <div className={"flex flex-wrap gap-2 mt-5 font-mono"}>
          {professor.tags.map((tag, index) => (
            <span
              key={index}
              className={"text-sm px-3 py-1 border border-white rounded-xl"}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div id="reviews">
        <div className={"flex flex-col gap-2 mt-5 font-mono"}>
          <div className={"flex flex-col gap-2 p-3 pl-16 relative"}>
            <FaQuoteLeft
              className={"absolute top-[-10xp] left-0"}
              size={60}
              color={"rgba(255,255,255,0.6)"}
            />
            <span className={"text-sm leading-8"}>
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
            onClick={() => {
              if (index === 0) {
                setIndex(professor.comments.length - 1);
              } else {
                setIndex(index - 1);
              }
            }}
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
          <Link
            href={{
              pathname: "/skills",
              query: {
                professor: professor.name,
                course,
              },
            }}
          >
            <Button
              variant="outlined"
              style={{
                color: "black",
                backgroundColor: "white",
                borderColor: "white",
              }}
            >
              Help Me Pass!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
