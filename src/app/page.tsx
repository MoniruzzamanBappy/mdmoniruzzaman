import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Experiences from "@/components/Experiences";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_30%),linear-gradient(to_bottom,#061018,#0b1220,#0f172a)] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-30 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="absolute -right-15 top-70 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute bottom-20 left-[35%] h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      </div>
      <div className="mx-10">
        <Navbar />
        <Hero />
        <About />
        <Experiences />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </div>
    </main>
  );
}
