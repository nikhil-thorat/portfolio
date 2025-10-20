import { getAllBlogs } from "@/lib/blog";
import Title from "./title";
import Link from "next/link";

function Blogs() {

  const blogs = getAllBlogs()

  return <section className="group space-y-8">
    <Title>Writings</Title>
    <div>
      <div className="flex flex-col gap-4">
        {blogs.length == 0 && <p className="text-sm">Coming Soon..!</p>}
        {blogs.map((blog, key) => {
          return (
            <div key={key} className="flex items-center justify-between">
              <Link className="hover:text-neutral-700 hover:underline underline-offset-2 decoration-2 decoration-orange-500" href={"/blogs/" + blog.slug}>
                {blog.title}
              </Link>
              <span className="text-sm">{blog.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  </section >
}

export default Blogs;
