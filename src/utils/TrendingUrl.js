export default function TrendingUrl(type) {
  const url =
    type === "movie"
      ? "https://api.themoviedb.org/3/trending/movie/week?language=en-US"
      : `https://api.themoviedb.org/3/trending/tv/week?language=en-US`;
  return url;
}
