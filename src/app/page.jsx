import About from "@/components/section/about";
import Landing from "@/components/section/landing";
import ProjectsGallery from "@/components/section/projects-gallery";

export default function Home() {
  return (
    <main>
      <div className="px-10">
        <Landing />
        <About />
        <ProjectsGallery />
      </div>
    </main>
  );
}
