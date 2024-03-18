import { useQuery } from "@tanstack/react-query";
import fetchTrendingType from "../../../hooks/Trending/fetchTrendingType";
import TrendingUrl from "../../../utils/TrendingUrl";
import MainSlider from "../../../components/Slider/MainSlider";
import LoadingAnimation from "../../../components/Status/LoadingAnimation";
import ErrorComponent from "../../../components/Status/ErrorComponent";
export default function MainSection() {
  const { data: TrendingMovies, status: MoviesStatus } = useQuery(
    ["TrendingMovies"],
    () => fetchTrendingType(TrendingUrl("movie"))
  );
  const { data: TrendingTv, status } = useQuery(["TrendingTV"], () =>
    fetchTrendingType(TrendingUrl("tv"))
  );
  return (
    <div className="relative overflow-x-hidden">
      {status === "success" && MoviesStatus === "success" && (
        <>
          <MainSlider
            data={TrendingMovies.results}
            TypeLink={"info"}
          ></MainSlider>
          <MainSlider data={TrendingTv.results} TypeLink={"info"}></MainSlider>
        </>
      )}
      {status === "loading" && (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingAnimation></LoadingAnimation>
        </div>
      )}
      {status === "error" && (
        <div className="w-full h-full flex justify-center items-center pt-20">
          <ErrorComponent></ErrorComponent>
        </div>
      )}
    </div>
  );
}
