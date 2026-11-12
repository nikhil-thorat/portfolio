import Footer from "@/components/footer";
import Header from "@/components/header";
import TopBar from "@/components/top-bar";
import { formatBlogDate, getBlogBySlug, getBlogSlugs } from "@/lib/blog";
import Markdown from "markdown-to-jsx";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;

  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const description =
    blog.content
      .split("\n")
      .find((para) => para.length > 0)
      ?.slice(0, 150) || "";

  return {
    title: blog.title,
    description,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: {
      title: blog.title,
      description,
      type: "article",
      publishedTime: new Date(blog.date).toISOString(),
      url: `/blogs/${slug}`,
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: ["/og.jpg"],
    },
    authors: [{ name: "Nikhil Thorat" }],
  };
};

async function Blog({ params }: Props) {
  const { slug } = await params;

  const blog = getBlogBySlug(slug);

  if (!blog) {
    return notFound();
  }

  return (
    <main className="flex min-h-dvh flex-col">
      <TopBar />
      <section className="relative container mx-auto w-full max-w-3xl flex-1 px-6 sm:px-8 lg:px-0">
        <Header />
        <article data-reveal className="w-full pb-16 sm:pb-28">
          <Link
            href="/blogs"
            className="font-light text-base hover:text-neutral-800 hover:underline underline-offset-2 decoration-2 decoration-wavy decoration-yellow-400"
          >
            All posts
          </Link>
          <h1 className="mt-6 text-4xl font-semibold tracking-tighter text-neutral-800 text-pretty sm:mt-8 sm:text-5xl md:text-6xl">
            {blog.title}
          </h1>
          <time
            dateTime={new Date(blog.date).toISOString()}
            className="mt-3 block text-base font-light text-neutral-400 sm:mt-4"
          >
            {formatBlogDate(blog.date)}
          </time>
          <div className="mt-10 sm:mt-16">
            <Markdown className="prose prose-base max-w-none leading-7 prose-neutral prose-headings:tracking-tighter prose-headings:text-neutral-800 prose-p:text-neutral-500 prose-li:text-neutral-500 prose-strong:text-neutral-700 prose-a:text-neutral-700 prose-a:decoration-yellow-400 prose-a:decoration-wavy prose-a:decoration-2 prose-a:underline-offset-2 prose-a:hover:text-neutral-900 prose-blockquote:border-neutral-300 prose-blockquote:text-neutral-500 prose-code:text-neutral-600 prose-pre:bg-neutral-200/70 prose-pre:text-neutral-700 prose-img:rounded-xl sm:prose-lg sm:leading-8">
              {blog.content}
            </Markdown>
          </div>
        </article>
      </section>
      <Footer />
    </main>
  );
}

export default Blog;
