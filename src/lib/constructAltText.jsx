function ExtractImageRoute(src) {
  const splitSrc = src.split("/");
  const parentName = splitSrc[splitSrc.length - 2];
  const fileName = splitSrc[splitSrc.length - 1];
  return { parent: parentName, fileName: fileName };
}

function ConstructImageAltText(src) {
  const { parent: parentName, fileName } = ExtractImageRoute(src);
  return `${parentName} | Image ${fileName}`;
}

function ConstructYoutubeAltText(src) {
  const id = src.split("/").pop().split("?")[0];
  return `Youtube | Video ${id}`;
}

export { ConstructImageAltText, ConstructYoutubeAltText };
