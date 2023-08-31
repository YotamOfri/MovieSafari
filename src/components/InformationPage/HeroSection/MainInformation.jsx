import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { TrailerContext } from "./TrailerContext";
import { useContext } from "react";
import { InformationContext } from "../InformationContext";
export function MainInformation({ details }) {
  const {
    videoAspect,
    isMuted,
    setIsMuted,
    isPlaying,
    setVideoFinished,
    setIsPlaying,
    videoId,
  } = useContext(TrailerContext);
  const { MediaType } = useContext(InformationContext);
  const handleMute = () => {
    if (isPlaying) setIsMuted((current) => (current ? false : true));
    else {
      setIsPlaying(true);
      setVideoFinished(false);
    }
  };
  const { id } = useParams();
  return (
    <div
      className="w-full px-5 flex  sm:justify-start justify-center lg:mt-20 sm:mt-20 mt-36"
      style={{ height: `calc(${100 / videoAspect}vw - 30vw)` }}
    >
      <div className="z-40 flex flex-col sm:justify-around justify-between sm:gap-0 gap-5 w-full">
        <div className="flex flex-col gap-10">
          <h1 className="sm:text-4xl lg:text-6xl text-3xl">
            {details.original_title
              ? details.original_title
              : details.name
              ? details.name
              : ""}
          </h1>
          <div className="hidden lg:block w-2/3">
            <h3 className="">{details.overview}</h3>
          </div>
        </div>
        <div
          className={`flex flex-row-reverse ${
            videoId.length > 0 ? "justify-between" : "justify-end"
          } items-center w-full`}
        >
          {videoId.length > 0 && (
            <div
              onClick={handleMute}
              className="cursor-pointer border-2 rounded-full h-10 w-10 flex justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out"
            >
              {isPlaying ? (
                <i className={`bx bxs-volume-${isMuted ? "mute" : "full"}`}></i>
              ) : (
                <span className="material-symbols-outlined">autorenew</span>
              )}
            </div>
          )}
          <div className="flex sm:gap-10 gap-2">
            <Link
              to={`/${MediaType}/player/${id}`}
              className=" bg-white text-black font-bold w-20 h-10  rounded-sm flex items-center justify-center hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="flex justify-center items-center pr-1">
                <i className="bx bx-play text-2xl "></i>
                Play
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
MainInformation.propTypes = {
  details: PropTypes.object,
};
