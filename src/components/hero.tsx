import Link from "next/link";

function Hero() {
  return (
    <section className="my-14 flex flex-col gap-4 sm:my-20">
      <p data-hero className="text-xl font-light sm:text-2xl">
        Hey, <span className="ml-2 text-2xl sm:text-3xl">👋🏻</span>
      </p>
      <h1
        data-split
        data-split-delay="0.3"
        className="text-5xl font-semibold tracking-tighter sm:text-6xl md:text-7xl"
      >
        {"I'm Nikh!l"}
      </h1>
      <div
        data-hero
        className="mt-8 space-y-6 text-lg font-light text-pretty sm:mt-12 sm:space-y-8 sm:text-xl"
      >
        <p>
          A software engineer based in Pune, India. Drawn to backend systems,
          thoughtful engineering and interesting problems. I enjoy building
          things, learning continuously and finding inspiration in the little
          things beyond technology.
        </p>
        <p>
          I spend my free time playing classical Guitar, solving Rubik’s Cube
          and watching Beatbox/Loopstation battles.
        </p>
      </div>
      <div
        data-hero
        className="mt-10 flex flex-wrap items-center gap-6 sm:mt-20 sm:gap-12"
      >
        <Link href={"#contact"}>
          <button
            data-magnetic
            className="squircle rounded-4xl bg-neutral-200 cursor-pointer px-8 py-3.5 text-base shadow-md border border-neutral-300 sm:px-12 sm:py-4"
          >
            {"Let's talk"}
          </button>
        </Link>
        <Link
          href={
            "https://drive.google.com/drive/folders/1ITWi8YoAnW56ORAglBwlZGDzeI6U0DZg?usp=sharing"
          }
          className="hover:underline underline-offset-2 decoration-2 decoration-wavy decoration-yellow-400"
        >
          View CV
        </Link>
      </div>
    </section>
  );
}
export default Hero;
