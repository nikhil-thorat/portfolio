import fs from "fs";
import matter from "gray-matter";
import path from "path";

export interface IBlog {
    slug: string;
    title: string;
    content: string;
    date: string;
}

const blogsDir = path.join(process.cwd(), "blogs");

export const getBlogSlugs = () => {
    return fs.readdirSync(blogsDir);
};

export const getBlogBySlug = (slug: string): IBlog | null => {
    const fullPath = path.join(blogsDir, slug, "blog.md");

    if (!fs.existsSync(fullPath)) {
        return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title ?? "Untitled",
        content,
        date: data.date ?? new Date().toDateString(),
    };
};

export const getAllBlogs = (): IBlog[] => {
    const slugs = getBlogSlugs();
    const blogs = slugs
        .map((slug) => getBlogBySlug(slug))
        .filter((blog) => blog != null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


    return blogs;
};

export const formatBlogDate = (date: string) => {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
        return date;
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(parsed);
};

export const getBlogExcerpt = (content: string, length = 170) => {
    const paragraph = content
        .split("\n")
        .map((line) => line.trim())
        .find((line) => line && !/^[#>\-*|]/.test(line) && !line.startsWith("!["));

    if (!paragraph) {
        return "";
    }

    const plain = paragraph
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[`*_]/g, "");

    return plain.length > length ? `${plain.slice(0, length).trimEnd()}…` : plain;
};
