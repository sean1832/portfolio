import About from "@/components/section/about";
import Landing from "@/components/section/landing";
import Projects from "@/components/section/projects";
import NavBar from "@/components/ui/navbar";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="px-10">
        <Landing />
        <div id="about">
          <About />
        </div>
        <div id="projects">
          <Projects />
        </div>
      </div>
    </main>
  );
}
