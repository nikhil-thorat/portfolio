import { useMobileNavigation } from "../context/MobileNavigationContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
	const { toggleTheme, theme } = useTheme();
	const { toggleMobileNavigation } = useMobileNavigation();

	return (
		<nav
			className={`sticky top-0 flex items-center justify-between w-full gap-2 py-4 h-fit z-40 transition-colors duration-300 ${
				theme === "dark" ? "bg-stone-900" : "bg-stone-300"
			}`}
		>
			<div className="md:hidden" onClick={toggleMobileNavigation}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width={24}
					height={24}
					color={"currentColor"}
					fill={"none"}
				>
					<path
						d="M4 5L16 5"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M4 12L20 12"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M4 19L12 19"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
			<div className="flex-1">
				<h1 className="text-2xl font-medium">
					<a href="#home">Nikhil Thorat.</a>
				</h1>
			</div>
			<ul className="items-center flex-1 hidden gap-8 text-xl font-light lg:flex md:flex">
				<li className="cursor-pointer hover:underline decoration-wavy underline-offset-4">
					<a href="#about">About</a>
				</li>
				<li className="cursor-pointer hover:underline decoration-wavy underline-offset-4">
					<a href="#skills">Skills</a>
				</li>
				<li className="cursor-pointer hover:underline decoration-wavy underline-offset-4">
					<a href="#projects">Projects</a>
				</li>

				<li className="cursor-pointer hover:underline decoration-wavy underline-offset-4">
					<a href="#contact">Get in touch!</a>
				</li>
			</ul>
			<div>
				<button onClick={toggleTheme}>
					{theme === "light" ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={24}
							height={24}
							color={"currentColor"}
							fill="none"
						>
							<path
								d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							<path
								d="M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={24}
							height={24}
							color={"currentColor"}
							fill="none"
						>
							<path
								d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					)}
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
