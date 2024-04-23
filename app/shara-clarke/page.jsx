import ProjectInfo from "@/components/section/project-info";
import React from "react";
import projectData from "@/data/projects.json";
import Image from "next/image";
import NavBar from "@/components/ui/navbar";

const SharaClarkePage = () => {
  const data = projectData.find(
    (project) => project.name.toLowerCase() === "shara clarke".toLowerCase()
  );
  return (
    <div className="px-10">
      <NavBar />
      <ProjectInfo data={data} />
    </div>
  );
};

export default SharaClarkePage;
