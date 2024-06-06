import React from "react";
import projectData from "@/data/projects.json";
import ProjectInfo from "@/components/layout/projectDetailSection";
import { ProjectNavigation } from "@/components/ui/project-navigation";

const ProjectPage = ({ params }) => {
  const projectIndex = projectData.findIndex(
    (project) => project.id.toLowerCase() === params.id.toLowerCase()
  );

  const data = projectData[projectIndex];

  return (
    <>
      <ProjectInfo data={data} />
      <ProjectNavigation projectData={projectData} index={projectIndex} />
    </>
  );
};

export default ProjectPage;
