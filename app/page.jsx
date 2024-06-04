import About from "@/components/section/about";
import Landing from "@/components/section/landing";
import ProjectsGallery from "@/components/section/projects-gallery";
import GithubFloatingButton from "@/components/ui/button/githubFloatingButton";

export default function Home() {
  return (
    <main>
      <div className="px-10">
        <Landing />
        <About />
        <ProjectsGallery />
        <GithubFloatingButton />
      </div>
    </main>
  );
}
