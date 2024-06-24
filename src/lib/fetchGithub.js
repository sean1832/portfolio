const FetchLatestVersion = async (repo) => {
  const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);
  const data = await res.json();
  return data.tag_name;
};

const FetchRepoUrl = async (repo) => {
  const res = await fetch(`https://api.github.com/repos/${repo}`);
  const data = await res.json();
  return data.html_url;
};

const FetchLatestUrl = async (repo) => {
  const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);
  const data = await res.json();
  return data.html_url;
};

export { FetchLatestVersion, FetchRepoUrl, FetchLatestUrl };
