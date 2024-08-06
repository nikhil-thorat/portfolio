import { useTheme } from "../context/ThemeContext";

const SkillCard = ({ index, skill }: { index: number; skill: any }) => {
	const { theme } = useTheme();

	return (
		<div
			id="card"
			key={index}
			className="flex flex-col items-start justify-start gap-4 p-4 border animate-reveal rounded-xl lg:rounded-2xl border-stone-700"
		>
			<img
				src={theme === "dark" ? skill.darkIcon : skill.icon}
				alt={skill.name}
			/>
			<h1 className="text-2xl font-medium">{skill.name}</h1>
			<p className="mt-2 text-base font-light lg:mt-4">{skill.description}</p>
			<span className="flex flex-wrap gap-2">
				{skill.tags.map((tag: any, index: number) => (
					<span
						className="px-3 py-1 text-xs border rounded-full lg:text-sm border-stone-700"
						key={index}
					>
						{tag}
					</span>
				))}
			</span>
		</div>
	);
};

export default SkillCard;
