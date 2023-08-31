import { DisplayByApi } from "./DisplayByApi";

export function MainSection() {
  const TrendingMoviesURL =
    "https://api.themoviedb.org/3/trending/movie/week?language=en-US";
  const TrendingTvURL =
    "https://api.themoviedb.org/3/trending/tv/week?language=en-US";
  return (
    <div className="relative ">
      <DisplayByApi URL={TrendingMoviesURL}></DisplayByApi>
      <DisplayByApi URL={TrendingTvURL}></DisplayByApi>
    </div>
  );
}
