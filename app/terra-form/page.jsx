import React from "react";
import NavBar from "@/components/ui/navbar";
import projectData from "@/data/projects.json";
import ProjectInfo from "@/components/section/project-info";

const TerraFormPage = () => {
  const data = projectData.find(
    (project) => project.name.toLowerCase() === "terra // form".toLowerCase()
  );
  return (
    <>
      <NavBar />
      <ProjectInfo data={data} />
    </>
  );
};

export default TerraFormPage;
