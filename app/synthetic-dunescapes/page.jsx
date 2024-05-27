import React from "react";
import projectData from "@/data/projects.json";
import ProjectInfo from "@/components/section/project-info";
import Footer from "@/components/section/footer";
import { ProjectNavigation } from "@/components/ui/project-navigation";

const projectName = "Synthetic Dunescapes";
// Find the index of the current project
const dataIndex = projectData.findIndex(
  (project) => project.name.toLowerCase() === projectName.toLowerCase()
);

const data = projectData[dataIndex];

export const metadata = {
  title: projectName,
  description: data.description,
};

const SyntheticDunescapesPage = () => {
  return (
    <>
      <ProjectInfo data={data} />
      <ProjectNavigation projectData={projectData} index={dataIndex} />
      <Footer />
    </>
  );
};

export default SyntheticDunescapesPage;
