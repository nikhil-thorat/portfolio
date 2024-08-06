import SkillsData from "../utils/SkillsData";
import SkillCard from "./SkillCard";

const Skills = () => {
	return (
		<section className="flex flex-col items-center justify-center w-full h-auto min-h-full">
			<div className="flex flex-col items-start justify-start w-full max-w-xl mx-auto">
				<h1 className="text-6xl font-light lg:text-7xl animate-reveal">
					Skills 🛠️
				</h1>
			</div>
			<div className="grid max-w-4xl grid-cols-1 gap-4 mt-12 lg:grid-cols-3">
				{SkillsData.map((skill, index) => (
					<SkillCard key={index} skill={skill} />
				))}
			</div>
		</section>
	);
};

export default Skills;
