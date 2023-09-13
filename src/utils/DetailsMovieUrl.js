export default function DetailsUrl(id, type) {
  const url =
    type === "movie"
      ? `https://api.themoviedb.org/3/movie/${id}?language=en-US`
      : `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
  return url;
}
