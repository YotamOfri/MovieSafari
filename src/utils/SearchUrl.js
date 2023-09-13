export default function SearchUrl(query, type) {
  const url =
    type === "movie"
      ? `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
      : `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`;
  return url;
}
