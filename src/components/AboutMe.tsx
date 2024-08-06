const AboutMe = () => {
	return (
		<section className="flex flex-col items-center justify-center">
			<div className="flex flex-col items-start max-w-xl gap-12 mx-auto">
				<h1 className="text-6xl font-light lg:text-7xl animate-reveal">
					About Me 😊
				</h1>
				<div className="flex flex-col items-start gap-4 text-lg font-light lg:text-xl">
					<p className="animate-reveal">
						Hello, I'm <span className="font-medium">Nikhil Thorat</span>, a
						Self-taught developer recently graduated with a Bachelor's degree in
						<span className="font-medium"> Computer Applications.</span>
					</p>
					<p className="animate-reveal">
						I started my coding journey in Junior College, where I learnt about
						<span className="font-medium"> Fundamentals of Programming.</span>
						<br /> Over time I got into Web development and evolved as a
						<span className="font-medium"> Fullstack developer</span> with a
						keen Focus on crafting Elegant and Seamless User Interfaces for the
						Web.
					</p>
					<p className="animate-reveal">
						<span className="font-medium">When I'm not coding</span>, I enjoy
						playing <span className="font-medium">Guitar, Chess</span> and
						Games. I also love to explore and get inspired by{" "}
						<span className="font-medium">Art & Design.</span> I'm always
						looking for new challenges and opportunities to grow as a Developer.
					</p>
					<a
						href="/Resume.pdf"
						className="flex items-center gap-2 mt-2 cursor-pointer animate-reveal group"
					>
						<p className="text-base">View my Resume</p>
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
			</div>
		</section>
	);
};

export default AboutMe;
