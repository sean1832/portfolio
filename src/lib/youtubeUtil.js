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

function SetYoutubeUrl(url, startTime = 0, isAutoPlay, isMutted, isLoop) {
  isAutoPlay = isAutoPlay ? 1 : 0;
  isMutted = isMutted ? 1 : 0;
  isLoop = isLoop ? 1 : 0;
  let playList = "";

  const id = GetYoutubeId(url);
  if (!id) {
    console.error("Invalid Youtube URL");
    return null;
  }
  const baseUrl = `https://www.youtube.com/embed/${id}`;

  if (isAutoPlay && !isMutted) {
    isMutted = 1;
  }

  if (isLoop) {
    playList = id;
  }

  return (
    `${baseUrl}?start=${startTime}&autoplay=${isAutoPlay}&mute=${isMutted}&loop=${isLoop}` +
    (playList ? `&playlist=${playList}` : "")
  );
}

export { GetYoutubeId, GetYoutubeThumbnail, SetYoutubeUrl };
