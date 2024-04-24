import ProjectInfo from "@/components/section/project-info";
import React from "react";
import projectData from "@/data/projects.json";
import NavBar from "@/components/ui/navbar";

const projectName = "Shara Clarke";
const data = projectData.find(
  (project) => project.name.toLowerCase() === projectName.toLowerCase()
);
export const metadata = {
  title: projectName,
  description: data.description,
};

const SharaClarkePage = () => {
  return (
    <div className="px-10">
      <NavBar />
      <ProjectInfo data={data} />
    </div>
  );
};

export default SharaClarkePage;
