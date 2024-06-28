import React from "react";
import projectData from "@data/projects.json";
import ProjectInfo from "@/components/layout/projectDetailSection";
import { ProjectNavigation } from "@/components/ui/project-navigation";
import { notFound } from "next/navigation";

// dynamically generate page if params is not known during built time
// set to true if you want to update the site content without rebuilding the site
// see doc: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamicParams = false;

// static generation of project page during built time based on project id
// see doc: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
  const ids = projectData.map((project) => project.id);

  return ids.map((projectID) => ({
    id: projectID,
  }));
}

const ProjectPage = ({ params }) => {
  const projectIndex = projectData.findIndex(
    (project) => project.id.toLowerCase() === params.id.toLowerCase()
  );

  if (projectIndex === -1) {
    notFound();
  }

  const data = projectData[projectIndex];

  return (
    <>
      <ProjectInfo data={data} />
      <ProjectNavigation projectData={projectData} index={projectIndex} />
    </>
  );
};

export default ProjectPage;
