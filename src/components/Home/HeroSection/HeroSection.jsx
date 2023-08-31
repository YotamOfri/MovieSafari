import fetchTrendingAll from "../../Hooks/fetchTrendingAll";
import useDetailsById from "../../functions/useDetailsById";
import { YoutubePlayer } from "./YoutubePlayer";
import { MainMovieInformation } from "./MainMovieInformation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { VideoContext } from "./VideoContext";
export function HeroSection() {
  const [videoAspect, setVideoAspect] = useState(16 / 9);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoFinished, setVideoFinished] = useState(false);
  const { data: TrendingResults } = useQuery(["trendingResults"], () =>
    fetchTrendingAll(
      "https://api.themoviedb.org/3/trending/all/week?language=en-US"
    )
  );
  const idMediaPairs = TrendingResults
    ? TrendingResults.map((result) => [result.id, result.media_type])
    : [];
  const { data: Trendingdetails } = useDetailsById(
    idMediaPairs,
    "Trendingdetails"
  );
  const videoContextValue = {
    isPlaying,
    setIsPlaying,
    setVideoAspect,
    videoAspect,
    isMuted,
    setIsMuted,
    videoFinished,
    setVideoFinished,
  };
  return (
    <div className="lg:min-h-[550px] lg:max-h-none max-h-[300px] min-h-[300px] h-[70vh] overflow-hidden w-full relative   shadow-white ">
      {Trendingdetails && Trendingdetails.length > 0 && (
        <>
          <VideoContext.Provider value={videoContextValue}>
            <YoutubePlayer Trendingdetails={Trendingdetails[0]}></YoutubePlayer>
            <MainMovieInformation
              TrendingDetails={Trendingdetails[0]}
              mediaType={idMediaPairs[0][1]}
            ></MainMovieInformation>
          </VideoContext.Provider>
        </>
      )}
    </div>
  );
}
