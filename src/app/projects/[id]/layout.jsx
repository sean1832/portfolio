import projectData from "@data/projects.json";

// see doc: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
export async function generateMetadata({ params }) {
  // read route params
  const id = params.id;

  // fetch data
  const projectIndex = projectData.findIndex(
    (project) => project.id.toLowerCase() === id.toLowerCase()
  );

  if (projectIndex === -1) {
    return { notFound: true };
  }

  const project = projectData[projectIndex];
  const heroImage = project.mediaContainer.media.find((image) => image.isHero);

  // return metadata
  return {
    title: project.name,
    description: project.description,
    openGraph: {
      images: [heroImage.src],
    },
  };
}

const projectLayout = ({ children }) => {
  return <>{children}</>;
};

export default projectLayout;
