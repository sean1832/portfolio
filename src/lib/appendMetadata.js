function AppendToMedia(projects, ...dataSets) {
  // Iterate through each project
  projects.forEach((project) => {
    // Ensure the project has a media array
    if (Array.isArray(project.media)) {
      // Iterate through each media item in the project
      project.media.forEach((media) => {
        dataSets.forEach((data) => {
          // Check if there is additional data for this media's src
          if (data[media.src]) {
            // Merge the additional data into the media item
            Object.assign(media, data[media.src]);
          }
        });
      });
    }
  });
}

export default AppendToMedia;