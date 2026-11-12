import Footer from "@/components/footer";
import Header from "@/components/header";
import Projects from "@/components/projects";
import TopBar from "@/components/top-bar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Systems, tools and experiments built by Nikhil Thorat, from in-memory databases to emulators and developer platforms.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Nikhil Thorat | Projects",
    description:
      "Systems, tools and experiments built by Nikhil Thorat, from in-memory databases to emulators and developer platforms.",
    url: "/projects",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
};

function ProjectsPage() {
  return (
    <main className="flex min-h-dvh flex-col">
      <TopBar />
      <section className="relative container mx-auto w-full max-w-3xl flex-1 px-6 sm:px-8 lg:px-0">
        <Header />
        <Link
          href="/"
          data-reveal
          className="font-light text-base hover:text-neutral-800 hover:underline underline-offset-2 decoration-2 decoration-wavy decoration-yellow-400"
        >
          Back home
        </Link>
        <Projects />
      </section>
      <Footer />
    </main>
  );
}

export default ProjectsPage;
