export default function Recommendtions(type, id) {
  const url =
    type === "tv"
      ? `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`
      : `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`;
  return url;
}
