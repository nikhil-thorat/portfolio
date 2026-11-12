import Link from "next/link";

function Header() {
  return (
    <header className="my-12 flex flex-wrap items-center justify-between gap-6 sm:my-20">
      <Link href={"/"} aria-label="Home">
        <p data-spin className="inline-block text-4xl sm:text-5xl">🌻</p>
      </Link>
    </header>
  );
}

export default Header;
