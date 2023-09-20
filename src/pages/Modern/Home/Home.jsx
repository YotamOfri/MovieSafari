import HeroSection from "../../../components/HeroSection/HeroSection";
import { useQuery } from "@tanstack/react-query";
import fetchTrendingAll from "../../../hooks/Trending/fetchTrendingAll";
import MainSection from "./MainSection";
import LoadingAnimation from "../../../components/Status/LoadingAnimation";
import ErrorComponent from "../../../components/Status/ErrorComponent";
export default function Home() {
  const { data: TrendingAll, status } = useQuery(["TrendingAll"], () =>
    fetchTrendingAll(
      "https://api.themoviedb.org/3/trending/all/week?language=en-US"
    )
  );
  return (
    <>
      <div className="text-white">
        {status === "success" && (
          <>
            <HeroSection
              id={TrendingAll.results[0].id}
              type={TrendingAll?.results[0].media_type}
              Code="HomePage"
            ></HeroSection>
            <MainSection></MainSection>
          </>
        )}
        {status === "loading" && (
          <div className="fixed h-full w-full flex justify-center items-center">
            <LoadingAnimation></LoadingAnimation>
          </div>
        )}
        {status === "error" && (
          <div className="w-full h-full flex justify-center items-center pt-20">
            <ErrorComponent></ErrorComponent>
          </div>
        )}
      </div>
    </>
  );
}
