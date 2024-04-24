import React from "react";
import projectData from "@/data/projects.json";
import NavBar from "@/components/ui/navbar";
import ProjectInfo from "@/components/section/project-info";

const projectName = "Mongrel Assembly";
const data = projectData.find(
  (project) => project.name.toLowerCase() === projectName.toLowerCase()
);
export const metadata = {
  title: projectName,
  description: data.description,
};

const MongrelAssemblyPage = () => {
  return (
    <div className="px-10">
      <NavBar />
      <ProjectInfo data={data} />
    </div>
  );
};

export default MongrelAssemblyPage;
