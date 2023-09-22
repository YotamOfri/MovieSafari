import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "./HeroSection/HeroSection";
import AnimefetchInfo from "../../../hooks/Anime/AnimefetchInfo";
import ErrorComponent from "../../../components/Status/ErrorComponent";
import LoadingAnimation from "../../../components/Status/LoadingAnimation";
import Episodes from "./Episodes/Episodes";
export const Context = React.createContext();
export default function Information() {
  const { id } = useParams();
  const split =
    id.split("-episode-").length > 1 ? id.split("-episode-") : [id, "1"];
  const seriesId = split[0];
  const [episode, setEpisode] = useState(split[1].match(/\d+/g)[0]);
  const { data: AnimeInfo, status } = useQuery(["AnimeInfo", seriesId], () =>
    AnimefetchInfo(seriesId)
  );
  const [data, setData] = useState(AnimeInfo);
  if (status === "success" && data === undefined) setData(AnimeInfo);
  const contextValue = { episode, setEpisode, data, setData };
  return (
    <div className="md:pt-20 pt-24 flex gap-10 2xl:flex-row flex-col-reverse h-fit 2xl:justify-center 2xl:items-start  items-center">
      <Context.Provider value={contextValue}>
        {status === "success" && (
          <>
            <Episodes data={data} episode={episode}></Episodes>
            <HeroSection data={data} episode={episode}></HeroSection>
          </>
        )}
        {status === "loading" && <LoadingAnimation></LoadingAnimation>}
        {status === "error" && <ErrorComponent></ErrorComponent>}
      </Context.Provider>
    </div>
  );
}
