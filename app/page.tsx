import dynamic from "next/dynamic";
import BackgroundScene from "@/components/BackgroundScene";
import AmbientDrift from "@/components/AmbientDrift";
import AmbientMarks from "@/components/AmbientMarks";
import Grain from "@/components/Grain";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";

// Above-the-fold stays eager. Below-the-fold is code-split so the initial
// hydration payload stays small; HTML is still SSR'd for SEO.
const About = dynamic(() => import("@/components/About"));
const Projects = dynamic(() => import("@/components/Projects"));
const TechStack = dynamic(() => import("@/components/TechStack"));
const Education = dynamic(() => import("@/components/Education"));
const Timeline = dynamic(() => import("@/components/Timeline"));
const Degrees = dynamic(() => import("@/components/Degrees"));
const Contact = dynamic(() => import("@/components/Contact"));
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"));

export default function Home() {
  return (
    <main>
      <BackgroundScene />
      <AmbientDrift />
      <AmbientMarks />
      <Grain />
      <Loader />
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Education />
      <Timeline />
      <Degrees />
      <Contact />
      <ScrollToTop />
    </main>
  );
}
