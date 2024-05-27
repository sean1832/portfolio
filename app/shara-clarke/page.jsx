import ProjectInfo from "@/components/section/project-info";
import React from "react";
import projectData from "@/data/projects.json";
import { ProjectNavigation } from "@/components/ui/project-navigation";

const projectName = "Shara Clarke";
// Find the index of the current project
const dataIndex = projectData.findIndex(
  (project) => project.name.toLowerCase() === projectName.toLowerCase()
);

const data = projectData[dataIndex];

export const metadata = {
  title: projectName,
  description: data.description,
};

const SharaClarkePage = () => {
  return (
    <>
      <ProjectInfo data={data} />
      <ProjectNavigation projectData={projectData} index={dataIndex} />
    </>
  );
};

export default SharaClarkePage;
