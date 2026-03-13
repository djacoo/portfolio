import BackgroundScene from "@/components/BackgroundScene";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import ThemeToggle from "@/components/ThemeToggle";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Timeline from "@/components/Timeline";
import Degrees from "@/components/Degrees";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <BackgroundScene />
      <Loader />
      <ScrollProgress />
      <Nav />
      <ThemeToggle />
      <Hero />
      <About />
      <Education />
      <Projects />
      <TechStack />
      <Timeline />
      <Degrees />
      <Contact />
      <ScrollToTop />
    </main>
  );
}
