import { useContext, useState } from "react";
import { InformationContext } from "../InformationContext";
import { TrailerContext } from "./TrailerContext";
import { TrailerRender } from "./TrailerRender";
import { MainInformation } from "./MainInformation";
export function HeroSection() {
  const { FeatchedData } = useContext(InformationContext);
  const [videoAspect, setVideoAspect] = useState(16 / 9);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoFinished, setVideoFinished] = useState(false);
  const [videoId, setVideoId] = useState("");
  const Trailercontext = {
    isPlaying,
    setIsPlaying,
    setVideoAspect,
    videoAspect,
    isMuted,
    setIsMuted,
    videoFinished,
    setVideoFinished,
    videoId,
    setVideoId,
  };

  return (
    <div className="lg:min-h-[550px] lg:max-h-none max-h-[300px] min-h-[300px] h-[50vh] overflow-hidden w-full relative">
      {FeatchedData && (
        <TrailerContext.Provider value={Trailercontext}>
          <TrailerRender details={FeatchedData}></TrailerRender>
          <MainInformation details={FeatchedData}></MainInformation>
        </TrailerContext.Provider>
      )}
    </div>
  );
}
