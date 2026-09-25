import Link from "next/link";
import Clock from "./clock";
import ScrambleText from "./scramble";

function Header() {
    return <header className="mt-28 flex justify-between items-center">
        <Link href={"/"}>
            <h1 className="text-lg tracking-tighter relative text-blue-500">
                <ScrambleText text="NIKHIL THORAT" />
                <span className="absolute -top-1 -right-4 -z-10 text-2xl font-bold">*</span>
            </h1>
        </Link>
        <Clock />
    </header>
}

export default Header;
