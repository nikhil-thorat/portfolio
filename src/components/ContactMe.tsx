import ContactsData from "../utils/ContactsData";

const ContactMe = () => {
	return (
		<section className="flex flex-col items-center justify-center w-full">
			<div className="flex flex-col items-start w-full max-w-xl gap-12 mx-auto">
				<h1 className="text-6xl font-light lg:text-7xl animate-reveal">
					Get in touch! 📬
				</h1>
				<div className="flex flex-col items-start gap-4 text-lg font-light lg:text-xl">
					{ContactsData.map((contact, index) => (
						<p className="animate-reveal" key={index}>
							{contact.heading}
							<a
								target="_blank"
								className="hover:underline decoration-wavy underline-offset-4"
								href={contact.link}
							>
								{contact.subheading}
							</a>
						</p>
					))}
				</div>
			</div>
		</section>
	);
};

export default ContactMe;
