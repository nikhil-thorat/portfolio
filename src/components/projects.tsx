import projects from "@/utils/projects";
import Title from "./title";

function Projects() {
  return <section className="group space-y-8">
    <Title>Projects</Title>
    <div className="flex flex-col gap-4">
      {projects.map((project) => {
        return <div key={project.github} className="flex flex-col gap-2">
          <a href={project.github} target="_blank" className="w-fit hover:underline decoration-2 underline-offset-2 decoration-orange-500">
            <h1 className="w-fit text-neutral-700">{project.title}</h1>
          </a>
          <p className="leading-7">
            {project.description}
          </p>
        </div>
      })}
    </div>
  </section>
}

export default Projects;
