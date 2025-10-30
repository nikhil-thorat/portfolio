import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif(
    {
        variable: "--font-instrument-serif",
        weight: ["400"],
        subsets: ["latin"],
        style: ["italic"]
    }
)

function Hero() {
    return <section className="space-y-8">
        <div className="flex gap-4 flex-col">
            <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                <h1>Pune, India</h1>
            </div>
            <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap-icon lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" /><path d="M22 10v6" /><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" /></svg>
                <h1>Student at SPPU</h1>
            </div>
        </div>
        <div className="space-y-4">
            <p className="leading-7"><span className={`italic tracking-normal text-xl font-semibold text-neutral-700 ${instrumentSerif.className}`}>Building Intelligent Systems.</span> I'm Nikhil, pursuing master's degree in Computer Applications, specializing in Artificial Intelligence and Machine Learning.</p>
            <p className="leading-7">
                I'm driven by AI's potential to solve complex, real-world problems and I am actively developing my skills to build impactful and smart solutions.
            </p>
            <p className="leading-7">
                Apart from coding, I like spending my time playing some music with my Guitar or playing Chess.
            </p>
        </div>
    </section>
}
export default Hero;
