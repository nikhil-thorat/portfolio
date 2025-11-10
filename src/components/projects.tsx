import projects from "@/utils/projects";
import Title from "./title";

function Projects() {
    return <section className="group space-y-8">
        <Title>Projects</Title>
        <div className="flex flex-col gap-12">
            {projects.map((project) => {
                return <div key={project.github} className="flex flex-col gap-2 group/project">
                    <a href={project.github} target="_blank" className="w-fit group-hover/project:underline decoration-2 underline-offset-2 decoration-blue-500">
                        <h1 className="w-fit text-neutral-700">{project.title}</h1>
                    </a>
                    <p className="leading-7">
                        {project.description}
                    </p>
                    <div className="flex flex-row gap-4 flex-wrap">
                        {project.tags.map((tag) => {
                            return <span className="text-sm italic bg-neutral-300/50 p-1.5 rounded-lg" key={tag}>{tag}</span>
                        })}
                    </div>
                </div>
            })}
        </div>
    </section>
}

export default Projects;
