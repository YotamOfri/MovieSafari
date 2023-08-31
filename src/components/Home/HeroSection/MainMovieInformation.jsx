import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { VideoContext } from "./VideoContext";
import { useContext } from "react";
export function MainMovieInformation({ TrendingDetails, mediaType }) {
  const {
    videoAspect,
    isMuted,
    setIsMuted,
    isPlaying,
    setVideoFinished,
    setIsPlaying,
  } = useContext(VideoContext);

  const handleMute = () => {
    if (isPlaying) setIsMuted((current) => (current ? false : true));
    else {
      setIsPlaying(true);
      setVideoFinished(false);
    }
  };

  return (
    <div
      className="w-full px-5 lg:pt-32 sm:pt-20 flex  sm:justify-start justify-center lg:mt-0 sm:mt-20 mt-36"
      style={{ height: `calc(${100 / videoAspect}vw - 30vw)` }}
    >
      <div className="z-40 flex flex-col md:pb-0  sm:justify-around justify-between sm:gap-0 gap-5 w-full">
        <div className="flex flex-col gap-10">
          <h1 className="sm:text-4xl lg:text-6xl text-3xl">
            {TrendingDetails.original_title}
          </h1>
          <div className="hidden lg:block w-2/3 max-w-[800px]">
            <h3 className="">{TrendingDetails.overview}</h3>
          </div>
        </div>
        <div className="flex flex-row-reverse justify-between items-center w-full">
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
          <div className="flex sm:gap-10 gap-2">
            <Link
              to={`/${mediaType}/player/${TrendingDetails.id}`}
              className=" bg-white text-black font-bold w-20 h-10  rounded-sm flex items-center justify-center hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="flex justify-center items-center pr-1">
                <i className="bx bx-play text-2xl "></i>
                Play
              </div>
            </Link>
            <Link
              to={`/${mediaType}/${TrendingDetails.id}`}
              className=" bg-gray-500 font-bold opacity-80 w-32 h-10 rounded-sm flex items-center justify-center hover:scale-105 transition-all duration-300 ease-in-out"
            >
              More Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
MainMovieInformation.propTypes = {
  TrendingDetails: PropTypes.object,
  mediaType: PropTypes.string,
};
