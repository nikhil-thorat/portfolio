const Hero = () => {
	return (
		<section className="flex flex-col items-center justify-center gap-4 ">
			<div className="items-start max-w-xl mx-auto font-light text-7xl">
				<h1 className="animate-reveal">Hi ✌️</h1>
				<h1 className="animate-reveal">
					I'm <span className="font-medium">Nikhil</span>.
				</h1>
				<p className="mt-2 text-xl font-light animate-reveal lg:text-2xl text-pretty">
					A <span className="font-medium">Web developer</span> passionate about
					developing <span className="font-medium">Full Stack</span> Web
					applications with a key focus on creating
					<span className="font-medium"> Elegant User Interfaces</span> for the
					Web.
				</p>
				<a
					href="#about"
					className="flex items-center gap-2 mt-6 cursor-pointer animate-reveal group"
				>
					<a href="#about" className="text-base">
						More about me
					</a>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width={20}
						height={20}
						color={"currentColor"}
						fill={"none"}
						className="transition-transform group-hover:translate-x-2 decoration-neutral-300"
					>
						<path
							d="M20.0001 11.9998L4.00012 11.9998"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M15.0003 17C15.0003 17 20.0002 13.3176 20.0002 12C20.0002 10.6824 15.0002 7 15.0002 7"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</a>
			</div>
		</section>
	);
};

export default Hero;
