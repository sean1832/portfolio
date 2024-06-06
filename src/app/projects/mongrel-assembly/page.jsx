import React from "react";
import projectData from "@/data/projects.json";
import ProjectInfo from "@/components/layout/projectDetailSection";
import { ProjectNavigation } from "@/components/ui/project-navigation";

const projectName = "Mongrel Assembly";
// Find the index of the current project
const dataIndex = projectData.findIndex(
  (project) => project.name.toLowerCase() === projectName.toLowerCase()
);

const data = projectData[dataIndex];

export const metadata = {
  title: projectName,
  description: data.description,
};

const MongrelAssemblyPage = () => {
  return (
    <>
      <ProjectInfo data={data} />
      <ProjectNavigation projectData={projectData} index={dataIndex} />
    </>
  );
};

export default MongrelAssemblyPage;
