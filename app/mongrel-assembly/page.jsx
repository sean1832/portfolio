import React from "react";
import projectData from "@/data/projects.json";
import NavBar from "@/components/ui/navbar";
import ProjectInfo from "@/components/section/project-info";

const MongrelAssemblyPage = () => {
  const data = projectData.find(
    (project) => project.name.toLowerCase() === "mongrel assembly".toLowerCase()
  );
  return (
    <div className="px-10">
      <NavBar />
      <ProjectInfo data={data} />
    </div>
  );
};

export default MongrelAssemblyPage;
