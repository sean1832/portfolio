import AboutSection from "@/components/layout/aboutSection";
import LandingSection from "@/components/layout/landingSection";
import ProjectsGallerySection from "@/components/layout/projectsGallerySection";
import AppendToMedia from "@/lib/appendMetadata";
import projectsData from "@data/projects.json";
import imageMetadata from "@data/generated/imageMetadata.json";

export default function Home() {
  AppendToMedia(projectsData, imageMetadata);
  return (
    <main>
      <div className="px-10">
        <LandingSection />
        <AboutSection />
        <ProjectsGallerySection projects={projectsData} />
      </div>
    </main>
  );
}
