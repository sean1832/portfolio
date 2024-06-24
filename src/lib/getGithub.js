const GetRepoUrl = (repo) => {
  return `https://github.com/${repo}`;
};

const GetLatestUrl = (repo) => {
  return `https://github.com/${repo}/releases/latest`;
};

export { GetRepoUrl , GetLatestUrl  };
