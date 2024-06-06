import AboutSection from "@/components/layout/aboutSection";
import LandingSection from "@/components/layout/landingSection";
import ProjectsGallerySection from "@/components/layout/projectsGallerySection";

export default function Home() {
  return (
    <main>
      <div className="px-10">
        <LandingSection />
        <AboutSection />
        <ProjectsGallerySection />
      </div>
    </main>
  );
}
