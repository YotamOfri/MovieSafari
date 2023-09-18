import { useState } from "react";
import AnimefetchServers from "../../../../hooks/Anime/AnimefetchServers";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "../../../../components/Status/LoadingAnimation";
import ErrorComponent from "../../../../components/Status/ErrorComponent";
import ServerButtons from "./ServerButtons";
import { Context } from "../Information";
import { useContext } from "react";
export default function HeroSection() {
  const [activeServer, setActiveServer] = useState(0);
  const { data, episode } = useContext(Context);
  const episodeId =
    parseInt(episode) < 0 || parseInt(episode) > data.episodes.length
      ? 0
      : data.episodes[parseInt(episode) - 1].id;
  const { data: servers, status } = useQuery(["servers", episodeId], () =>
    AnimefetchServers(episodeId)
  );
  const handleServerChange = (server) => {
    setActiveServer(server);
  };
  return (
    <div className="relative  overflow-y-hidden h-fit w-fit flex flex-col  items-center">
      {status === "success" && (
        <>
          <div className="sm:w-[70vw] sm:h-[calc(70vw/1.7)] w-[90vw] h-[calc(90vw/1.7)] min-h-[300px]">
            <iframe
              src={servers[activeServer].url}
              allowFullScreen={true}
              className="h-full w-full outline-none"
            ></iframe>
          </div>
          <ServerButtons
            handleServerChange={handleServerChange}
            activeServer={activeServer}
          ></ServerButtons>
        </>
      )}
      {status === "loading" && (
        <div className="sm:w-[70vw] sm:h-[calc(70vw/1.7)] w-[90vw] h-[calc(90vw/1.7)] min-h-[300px] flex justify-center items-center">
          <LoadingAnimation></LoadingAnimation>
        </div>
      )}
      {status === "error" && (
        <div className="sm:w-[70vw] sm:h-[calc(70vw/1.7)] w-[90vw] h-[calc(90vw/1.7)] min-h-[300px] flex justify-center items-center">
          <ErrorComponent></ErrorComponent>
        </div>
      )}
    </div>
  );
}
