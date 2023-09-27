export default function DetailsUrl(id, type) {
  const url =
    type === "movie"
      ? `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos&language=en-US`
      : `https://api.themoviedb.org/3/tv/${id}?append_to_response=videos&language=en-US`;
  return url;
}
