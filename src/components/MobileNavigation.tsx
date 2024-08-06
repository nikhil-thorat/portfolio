import { useMobileNavigation } from "../context/MobileNavigationContext";
import { useTheme } from "../context/ThemeContext";

const MobileNavigation = () => {
	const { isOpen, toggleMobileNavigation } = useMobileNavigation();
	const { theme } = useTheme();

	return (
		<section
			className={`fixed z-50 top-0 left-0 w-screen h-auto p-6 rounded-b-2xl transition-transform duration-300 ${
				theme === "dark" ? "bg-stone-300" : "bg-stone-900"
			} ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
		>
			<div
				className={`flex items-center justify-between flex-1 ${
					theme === "dark" ? "text-stone-700" : "text-stone-300"
				}`}
			>
				<h1 className="text-2xl font-medium ">
					<a href="#home" onClick={toggleMobileNavigation}>
						Nikhil Thorat.
					</a>
				</h1>
				<span onClick={toggleMobileNavigation}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width={24}
						height={24}
						color={"currentColor"}
						fill={"none"}
					>
						<path
							d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
			</div>
			<ul
				className={`flex flex-col items-start flex-1 gap-4 mt-4 text-xl font-light ${
					theme === "dark" ? "text-stone-700" : "text-stone-300"
				}`}
			>
				<li className="cursor-pointer hover:underline decoration-wavy underline-offset-4">
					<a href="#about" onClick={toggleMobileNavigation}>
						About
					</a>
				</li>
				<li className="cursor-pointer hover:underline decoration-wavy underline-offset-4">
					<a href="#skills" onClick={toggleMobileNavigation}>
						Skills
					</a>
				</li>
				<li className="cursor-pointer hover:underline decoration-wavy underline-offset-4">
					<a href="#projects" onClick={toggleMobileNavigation}>
						Projects
					</a>
				</li>

				<li className="cursor-pointer hover:underline decoration-wavy underline-offset-4">
					<a href="#contact" onClick={toggleMobileNavigation}>
						Get in touch!
					</a>
				</li>
			</ul>
		</section>
	);
};

export default MobileNavigation;
