import Footer from "@/components/footer";
import Header from "@/components/header";
import TopBlur from "@/components/top-blur";
import { getBlogBySlug, getBlogSlugs } from "@/lib/blog";
import Markdown from "markdown-to-jsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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

    if (!blog) {
        notFound();
    }

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

async function Blog({ params }: Props) {
    const { slug } = await params;

    const blog = getBlogBySlug(slug);

    if (!blog) {
        return notFound();
    }

    return (
        <section className="relative max-w-3xl w-auto px-8 lg:px-0 mx-auto space-y-20 mt-20">
            <TopBlur />
            <Header />
            <article className="space-y-8 mb-20 w-full">
                <h1 className="text-4xl text-pretty font-bold tracking-tight text-neutral-700">{blog.title}</h1>
                <div>{blog.date}</div>
                <Markdown className="min-w-full prose leading-7 prose-neutral prose-p:text-neutral-500 prose-a:decoration-neutral-300 prose-li:text-neutral-500 prose-a:text-neutral-700 prose-a:decoration-2 prose-a:underline-offset-2 prose-a:hover:decoration-blue-500 prose-headings:text-neutral-700 prose-headings:tracking-tighter prose-pre:bg-neutral-300/50 prose-code:text-neutral-500 prose-img:rounded-xl">{blog.content}</Markdown>
            </article>
            <Footer />
        </section>
    );
};

export default Blog;
