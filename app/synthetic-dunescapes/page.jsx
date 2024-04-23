import React from "react";
import NavBar from "@/components/ui/navbar";
import projectData from "@/data/projects.json";
import ProjectInfo from "@/components/section/project-info";

const SyntheticDunescapesPage = () => {
  const data = projectData.find(
    (project) => project.name.toLowerCase() === "synthetic dunescapes".toLowerCase()
  );
  return (
    <div className="px-10">
      <NavBar />
      <ProjectInfo data={data} />
    </div>
  );
};

export default SyntheticDunescapesPage;
