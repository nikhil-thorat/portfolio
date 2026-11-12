import Blogs from "@/components/blogs";
import Footer from "@/components/footer";
import Header from "@/components/header";
import TopBar from "@/components/top-bar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Notes on software, systems and the tools Nikhil Thorat uses to build them.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "Nikhil Thorat | Blogs",
    description:
      "Notes on software, systems and the tools Nikhil Thorat uses to build them.",
    url: "/blogs",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
};

function BlogsPage() {
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
        <Blogs excerpts />
      </section>
      <Footer />
    </main>
  );
}

export default BlogsPage;
