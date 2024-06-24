const GetYoutubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

const GetYoutubeThumbnail = (url, quality) => {
  const id = GetYoutubeId(url);
  if (!id) {
    console.error("Invalid Youtube URL");
    return null;
  }
  let imgName = "hqdefault";
  if (quality === "max") {
    imgName = "maxresdefault";
  }
  if (quality === "hq") {
    imgName = "hqdefault";
  }
  if (quality === "mq") {
    imgName = "mqdefault";
  }
  if (quality === "sd") {
    imgName = "sddefault";
  }
  return `https://img.youtube.com/vi/${id}/${imgName}.jpg`;
};

export { GetYoutubeId, GetYoutubeThumbnail };
