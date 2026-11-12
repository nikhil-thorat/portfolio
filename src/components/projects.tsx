import projects, { type IProject } from "@/utils/projects";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import AutoVideo from "@/components/auto-video";

const videoFor = (project: IProject) => {
  if (!project.video) return null;
  const file = join(process.cwd(), "public", "videos", project.video);
  return existsSync(file) ? `/videos/${project.video}` : null;
};

function ProjectCard({ project }: { project: IProject }) {
  const video = videoFor(project);

  return (
    <article data-reveal className="flex flex-col">
      {video && (
        <Link
          href={project.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} on GitHub`}
          data-scrub-scale
          className="border border-neutral-300 p-1.5 sm:p-2 squircle rounded-4xl shadow-lg"
        >
          <AutoVideo
            muted
            loop
            playsInline
            preload="metadata"
            src={video}
            width={1920}
            height={1080}
            className="aspect-video w-full cursor-pointer squircle squircle-4xl bg-neutral-200 object-cover"
          />
        </Link>
      )}
      <h2 className="text-2xl font-semibold tracking-tighter mt-4 sm:text-3xl">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="hover:underline underline-offset-2 decoration-2 decoration-wavy decoration-yellow-400"
        >
          {project.title}
        </a>
      </h2>
      <p className="text-lg font-light mt-2.5 sm:text-xl sm:mt-3">
        {project.description}
      </p>
      <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-4 text-xs font-light text-neutral-400 sm:text-sm sm:mt-5">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  );
}

function Projects({ featuredOnly = false }: { featuredOnly?: boolean }) {
  const list = featuredOnly
    ? projects.filter((project) => project.featured)
    : projects;

  return (
    <section className="my-14 space-y-8 sm:my-20 sm:space-y-12">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl">
          {"What I've built"}
        </h1>
        {featuredOnly && (
          <Link
            href="/projects"
            className="font-light text-base hover:text-neutral-800 hover:underline underline-offset-2 decoration-2 decoration-wavy decoration-yellow-400"
          >
            All projects
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-14 sm:gap-20">
        {list.map((project) => (
          <ProjectCard key={project.github} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
