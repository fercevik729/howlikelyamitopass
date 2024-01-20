import Image from "next/image";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
        <main>
            <section>
              <div id="top-hero-logo">
                  UCSC
              </div>
                <h1>How Likely Am I To Pass?</h1>
                <span>Every answer that a CS major at UCSC would ever need.</span>
            </section>
        </main>
    </>
  );
}
