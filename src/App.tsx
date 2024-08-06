import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";

function App() {
	return (
		<main className="container w-screen h-auto min-h-screen px-4">
			<MobileNavigation />
			<Navbar />
			<HomePage />
			<AboutPage />
			<SkillsPage />
			<ProjectsPage />
			<ContactPage />
			<Footer />
		</main>
	);
}

export default App;
