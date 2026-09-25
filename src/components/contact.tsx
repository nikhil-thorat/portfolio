import ScrambleText from "./scramble";
import Title from "./title";

function Contact() {
    return <section className="group space-y-8">
        <Title><span className="group-hover:text-blue-500"><ScrambleText text="CONTACT" /></span></Title>
        <div>
            <p>Reach me at <a href="mailto:work.nikhilthorat@gmail.com" target="_blank" className="hover:underline decoration-2 decoration-blue-500 hover:text-neutral-700 font-bold">work.nikhilthorat@gmail.com</a> or <a href="https://x.com/iamnikhilthorat" target="_blank" className="hover:underline decoration-2 decoration-blue-500 hover:text-neutral-700 font-bold">@iamnikhilthorat</a>
            </p>
        </div>
    </section>
}

export default Contact;
