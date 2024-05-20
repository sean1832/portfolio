import React from "react";
import NavBar from "@/components/ui/navbar";
import projectData from "@/data/projects.json";
import ProjectInfo from "@/components/section/project-info";
import Footer from "@/components/section/footer";
import { ProjectNavigation } from "@/components/ui/project-navigation";

const projectName = "Modular: Natural - Build";

// Find the index of the current project
const dataIndex = projectData.findIndex(
  (project) => project.name.toLowerCase() === projectName.toLowerCase()
);

const data = projectData[dataIndex];

export const metadata = {
  title: projectName,
  description: data.description,
};

const ModularPage = () => {
  return (
    <div>
      <NavBar />
      <ProjectInfo data={data} />
      <ProjectNavigation projectData={projectData} index={dataIndex} />

      <Footer />
    </div>
  );
};

export default ModularPage;
