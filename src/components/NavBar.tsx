import { FaDiscord, FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
export default function NavBar() {
  return (
    <header className={"flex justify-between px-8 py-7 bg-[#2484FF]"}>
      <Image src={"logo.svg"} alt={"page logo"} width={100} height={100} />
      <nav className={"flex justify-end"}>
        <ul
          className={
            "inline-flex gap-5 items-center text-white text-lg font-sans font-[500]"
          }
        >
          <li>
            <Link href="/about" passHref>
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link href="/credits" passHref>
              <span>Credits</span>
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/fercevik729/howlikelyamitopass"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={30} />
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/5Bb2ubbBKQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord size={30} />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
