import ProjectInfo from "@/components/section/project-info";
import React from "react";
import projectData from "@/data/projects.json";
import NavBar from "@/components/section/navbar";
import Footer from "@/components/section/footer";
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
      <NavBar />
      <ProjectInfo data={data} />
      <ProjectNavigation projectData={projectData} index={dataIndex} />
      <Footer />
    </>
  );
};

export default SharaClarkePage;
