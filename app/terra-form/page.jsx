import React from "react";
import NavBar from "@/components/ui/navbar";
import projectData from "@/data/projects.json";
import ProjectInfo from "@/components/section/project-info";
import Footer from "@/components/section/footer";
import { ProjectNavigation } from "@/components/ui/project-navigation";
// Find the index of the current project

const projectName = "Terra // Form";
const dataIndex = projectData.findIndex(
  (project) => project.name.toLowerCase() === projectName.toLowerCase()
);

const data = projectData[dataIndex];

const TerraFormPage = () => {
  return (
    <>
      <NavBar />
      <ProjectInfo data={data} />
      <ProjectNavigation projectData={projectData} index={dataIndex} />
      <Footer />
    </>
  );
};

export default TerraFormPage;
