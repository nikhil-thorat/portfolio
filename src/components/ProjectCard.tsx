const ProjectCard = ({ project }) => {
	return (
		<section className="flex flex-col items-start justify-start gap-2 p-4 border animate-reveal rounded-xl border-stone-700">
			<h2 className="text-2xl font-medium">{project.title}</h2>
			<p className="mt-2 text-base font-light text-pretty">
				{project.description}
			</p>
			<a
				href={project.repo}
				target="_blank"
				rel="noreferrer"
				className="flex items-center gap-2 mt-2 text-sm font-light"
			>
				View on GitHub
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width={18}
					height={18}
					color={"currentColor"}
					fill={"none"}
				>
					<path
						d="M9.5 14.5L14.5 9.49995"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
					<path
						d="M16.8463 14.6095L19.4558 12C21.5147 9.94108 21.5147 6.60298 19.4558 4.54411C17.397 2.48524 14.0589 2.48524 12 4.54411L9.39045 7.15366M14.6095 16.8463L12 19.4558C9.94113 21.5147 6.60303 21.5147 4.54416 19.4558C2.48528 17.3969 2.48528 14.0588 4.54416 12L7.1537 9.39041"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</svg>
			</a>
			<div className="flex flex-wrap gap-2 mt-2">
				{project.tags.map((tag: any, index: number) => (
					<span
						className="px-3 py-1 text-xs border rounded-full lg:text-sm border-stone-700"
						key={index}
					>
						{tag}
					</span>
				))}
			</div>
		</section>
	);
};

export default ProjectCard;
