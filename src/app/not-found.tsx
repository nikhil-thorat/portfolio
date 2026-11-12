import Link from "next/link";
import Footer, { SunflowerHead } from "@/components/footer";
import TopBar from "@/components/top-bar";

function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col">
      <TopBar />
      <section className="flex flex-1 items-center justify-center px-6 py-16 sm:px-8">
        <div className="flex w-full max-w-xl flex-col items-center text-center">
          <h1
            aria-label="404"
            className="flex items-center justify-center text-[clamp(5.25rem,13vw,9rem)] font-semibold leading-none"
          >
            <span aria-hidden="true">4</span>
            <SunflowerHead className="h-[0.84em] w-[0.84em] shrink-0" />
            <span aria-hidden="true">4</span>
          </h1>
          <h2 className="mt-9 text-3xl font-semibold tracking-tighter text-neutral-800 sm:text-4xl">
            You&apos;ve lost the path.
          </h2>
          <p className="mt-4 max-w-md text-lg font-light leading-relaxed text-neutral-500 text-pretty">
            This page doesn&apos;t exist. Be your own light and guide yourself
            back home.
          </p>
          <Link
            href="/"
            className="squircle mt-10 inline-flex items-center justify-center rounded-4xl border border-neutral-300 bg-neutral-200 px-12 py-4 text-neutral-800 shadow-md  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
          >
            Go back home
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default NotFound;
