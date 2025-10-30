import Link from "next/link";
import Clock from "./clock";

function Header() {
    return <header className="mt-28 flex justify-between items-center">
        <Link href={"/"}>
            <h1 className="text-lg tracking-tighter relative text-neutral-700">
                Nikhil Thorat
                <span className="absolute top-0 -right-3 text-blue-500 -z-10 text-2xl font-bold">*</span>
            </h1>
        </Link>
        <Clock />
    </header>
}

export default Header;
