import React from "react";
import NavBar from "@/components/ui/navbar";
import projectData from "@/data/projects.json";
import ProjectInfo from "@/components/section/project-info";

const projectName = "Synthetic Dunescapes";
const data = projectData.find(
  (project) => project.name.toLowerCase() === projectName.toLowerCase()
);
export const metadata = {
  title: projectName,
  description: data.description,
};

const SyntheticDunescapesPage = () => {
  return (
    <>
      <NavBar />
      <ProjectInfo data={data} />
    </>
  );
};

export default SyntheticDunescapesPage;
