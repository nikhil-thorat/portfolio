import Blogs from "@/components/blogs";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import TopBlur from "@/components/top-blur";

function Home() {
    return (
        <div className="max-w-3xl w-auto px-8 lg:px-0 mx-auto h-screen flex flex-col gap-16 relative">
            <TopBlur />
            <Header />
            <Hero />
            <Projects />
            <Blogs />
            <Contact />
            <Footer />
        </div>
    );
}

export default Home;
