import Blogs from "@/components/blogs";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import GitHubActivity from "@/components/github-activity";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import TopBar from "@/components/top-bar";

function Home() {
  return (
    <main className="flex min-h-dvh flex-col">
      <TopBar />
      <section className="relative container mx-auto w-full max-w-3xl flex-1 px-6 sm:px-8 lg:px-0">
        <Header />
        <Hero />
        <div data-reveal className="my-14 sm:my-20">
          <GitHubActivity username="nikhil-thorat" showMonths />
        </div>
        <Projects featuredOnly />
        <Blogs limit={2} showAllLink />
        <Contact />
      </section>
      <Footer />
    </main>
  );
}

export default Home;
