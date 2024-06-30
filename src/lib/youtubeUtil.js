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

function SetYoutubeUrl(url, startTime = 0, isAutoPlay, isMutted) {
  isAutoPlay = isAutoPlay ? 1 : 0;
  isMutted = isMutted ? 1 : 0;

  const id = GetYoutubeId(url);
  if (!id) {
    console.error("Invalid Youtube URL");
    return null;
  }
  const baseUrl = `https://www.youtube.com/embed/${id}`;

  if (isAutoPlay && !isMutted) {
    isMutted = 1;
  }

  return `${baseUrl}?start=${startTime}&autoplay=${isAutoPlay}&mute=${isMutted}`;
}

export { GetYoutubeId, GetYoutubeThumbnail, SetYoutubeUrl };
