import ProjectsData from "../utils/ProjectsData";
import ProjectCard from "./ProjectCard";

const Projects = () => {
	return (
		<section className="flex flex-col items-center justify-center w-full">
			<div className="flex flex-col items-start justify-start w-full max-w-xl mx-auto">
				<h1 className="text-6xl font-light animate-reveal lg:text-7xl">
					Projects 💼
				</h1>
			</div>
			<div className="grid max-w-4xl grid-cols-1 gap-4 mt-12 lg:grid-cols-2">
				{ProjectsData.map((project, index) => {
					return <ProjectCard key={index} project={project} />;
				})}
			</div>
		</section>
	);
};

export default Projects;
