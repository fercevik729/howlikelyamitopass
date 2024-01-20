import { FaDiscord, FaGithub } from "react-icons/fa";
import Image from "next/image";
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
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Credits</a>
          </li>
          <li>
            <a href="#">
              <FaGithub size={30} />
            </a>
          </li>
          <li>
            <a href="#">
              <FaDiscord size={30} />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
