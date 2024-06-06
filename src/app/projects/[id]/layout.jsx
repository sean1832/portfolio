import projectData from "@/data/projects.json";

// see doc: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
export async function generateMetadata({ params }) {
  // read route params
  const id = params.id;

  // fetch data
  const projectIndex = projectData.findIndex(
    (project) => project.id.toLowerCase() === id.toLowerCase()
  );
  const project = projectData[projectIndex];

  // return metadata
  return {
    title: project.name,
    description: project.description,
  };
}

const projectLayout = ({ children }) => {
  return <>{children}</>;
};

export default projectLayout;
