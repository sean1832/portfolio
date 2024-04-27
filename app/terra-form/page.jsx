import React from "react";
import NavBar from "@/components/ui/navbar";
import projectData from "@/data/projects.json";
import ProjectInfo from "@/components/section/project-info";
import Footer from "@/components/section/footer";

const TerraFormPage = () => {
  const data = projectData.find(
    (project) => project.name.toLowerCase() === "terra // form".toLowerCase()
  );
  return (
    <>
      <NavBar />
      <ProjectInfo data={data} />
      <Footer />
    </>
  );
};

export default TerraFormPage;
