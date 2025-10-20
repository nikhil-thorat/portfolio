import Footer from "@/components/footer";
import Header from "@/components/header";
import TopBlur from "@/components/top-blur";
import { getBlogBySlug, getBlogSlugs } from "@/lib/blog";
import Markdown from "markdown-to-jsx";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
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

  const description =
    blog.content
      .split("\n")
      .find((para) => para.length > 0)
      ?.slice(0, 150) || "";

  return {
    title: `Nikhil Thorat | ${blog.title}`,
    description,
    openGraph: {
      title: blog.title,
      description,
      type: "article",
      publishedTime: blog.date,
      url: `https://iamnikhilthorat.vercel.app/blogs/${slug}`,
    },
    authors: [{ name: "Nikhil Thorat" }],
    icons: {
      icon: "../../favicon.ico",
    },
  };
};

const Blog = async ({ params }: Props) => {
  const { slug } = await params;

  const blog = getBlogBySlug(slug);

  return (
    <section className="relative w-3xl mx-auto space-y-20 mt-20">
      <TopBlur />
      <Header />
      <article className="space-y-8 mb-20`">
        <h1 className="text-4xl text-pretty font-bold tracking-tight text-neutral-700">{blog.title}</h1>
        <div>{blog.date}</div>
        <main className="w-full prose leading-7 prose-neutral prose-p:text-neutral-500 prose-a:decoration-neutral-300 prose-li:text-neutral-500 prose-a:text-neutral-700 prose-a:decoration-2 prose-a:underline-offset-2 prose-a:hover:decoration-orange-500 prose-headings:text-neutral-700 prose-headings:tracking-tighter prose-pre:bg-neutral-300/50 prose-code:text-neutral-500 prose-img:rounded-xl">
          <Markdown className="w-3xl">{blog.content}</Markdown>
        </main>
      </article>
      <Footer />
    </section>
  );
};

export default Blog;
