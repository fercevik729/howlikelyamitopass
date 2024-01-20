import { FaDiscord, FaGithub } from "react-icons/fa";
export default function NavBar() {
    return (
        <header className={"px-8 py-5"}>
            <nav className={"flex justify-end"}>
                <ul className={"inline-flex gap-5 items-center text-white text-lg"}>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Credits</a></li>
                    <li><a href="#"><FaGithub size={30} /></a></li>
                    <li><a href="#"><FaDiscord size={30} /></a></li>
                </ul>
            </nav>
        </header>
    );
}