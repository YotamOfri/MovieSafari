import HeroSection from "./HeroSection";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "../../../components/Status/LoadingAnimation";
import ErrorComponent from "../../../components/Status/ErrorComponent";
import AnimefetchPouplar from "../../../hooks/Anime/AnimefetchPouplar";
import PopularSlider from "../../../components/AnimeComps/Slider/PopularSlider";
import AnimefetchInfo from "../../../hooks/Anime/AnimefetchInfo";
export default function Home() {
  const { data, status } = useQuery(["OnePiece"], () =>
    AnimefetchInfo("one-piece")
  );
  const { data: popularData, status: popularStatus } = useQuery(
    ["PopularAnime"],
    () => AnimefetchPouplar()
  );
  return (
    <>
      <div className="flex flex-col items-center h-full w-full justify-center">
        {status === "success" && <HeroSection data={data}></HeroSection>}
        {status === "loading" && (
          <div className="h-[500px] font-roboto md:h-[55vh] md:min-h-[550px] flex justify-center items-center">
            <LoadingAnimation></LoadingAnimation>
          </div>
        )}
        {status === "error" && <ErrorComponent></ErrorComponent>}
        {popularStatus === "success" && (
          <PopularSlider data={popularData.results}></PopularSlider>
        )}
        {popularStatus === "loading" && status === "success" && (
          <LoadingAnimation></LoadingAnimation>
        )}
        {popularStatus === "error" && <ErrorComponent></ErrorComponent>}
      </div>
    </>
  );
}
