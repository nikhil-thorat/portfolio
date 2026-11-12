import { formatBlogDate, getAllBlogs, getBlogExcerpt } from "@/lib/blog";
import Link from "next/link";

function Blogs({
  limit,
  showAllLink = false,
  excerpts = false,
}: {
  limit?: number;
  showAllLink?: boolean;
  excerpts?: boolean;
}) {
  const allBlogs = getAllBlogs();
  const blogs = typeof limit === "number" ? allBlogs.slice(0, limit) : allBlogs;

  return (
    <section className="my-14 space-y-8 sm:my-20 sm:space-y-12">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl">
          {"What I've written"}
        </h1>
        {showAllLink && (
          <Link
            href="/blogs"
            className="font-light text-base hover:text-neutral-800 hover:underline underline-offset-2 decoration-2 decoration-wavy decoration-yellow-400"
          >
            All posts
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-6 sm:gap-8">
        {blogs.length == 0 && <p className="text-sm">Coming Soon..!</p>}
        {blogs.map((blog) => (
          <article data-reveal key={blog.slug}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <Link
                className="text-lg font-light text-pretty hover:text-neutral-800 hover:underline underline-offset-2 decoration-2 decoration-wavy decoration-yellow-400 sm:text-xl"
                href={"/blogs/" + blog.slug}
              >
                {blog.title}
              </Link>
              <time
                dateTime={new Date(blog.date).toISOString()}
                className="text-sm font-light text-neutral-400 sm:text-base"
              >
                {formatBlogDate(blog.date)}
              </time>
            </div>
            {excerpts && (
              <p className="mt-2 max-w-2xl text-sm font-light leading-6 text-neutral-500 text-pretty sm:mt-3 sm:text-base sm:leading-7">
                {getBlogExcerpt(blog.content)}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Blogs;
