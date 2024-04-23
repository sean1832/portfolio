import About from "@/components/section/about";
import Footer from "@/components/section/footer";
import Landing from "@/components/section/landing";
import ProjectsGallery from "@/components/section/projects-gallery";
import NavBar from "@/components/ui/navbar";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="px-10">
        <Landing />
        <About />
        <ProjectsGallery />
        <Footer />
      </div>
    </main>
  );
}
