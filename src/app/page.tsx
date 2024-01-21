import Image from "next/image";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section id={"hero"} className={`flex py-36 items-center`}>
        <div className={"flex flex-col gap-[52px] text-white"}>
          <h1 className={"text-6xl font-bold"}>How Can I Pass?</h1>
          <span className={"text-xl"}>
            The answers that CS majors are looking for. Powered by AI.
          </span>
          <Link href={"/evaluate"} passHref>
            <Button
              style={{
                backgroundColor: "white",
                color: "black",
                padding: "10px 20px",
                borderRadius: "0",
              }}
              className={"w-fit"}
              variant={"contained"}
              color={"secondary"}
            >
              Get Started
            </Button>
          </Link>
        </div>
        <div>
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
