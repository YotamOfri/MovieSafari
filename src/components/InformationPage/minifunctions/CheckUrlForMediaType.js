export function CheckUrlForMediaType() {
  const currentPath = window.location.pathname;
  let contentType = "";

  if (currentPath.includes("movie")) {
    contentType = "movie";
  } else if (currentPath.includes("tv")) {
    contentType = "tv";
  }
  return contentType;
}
