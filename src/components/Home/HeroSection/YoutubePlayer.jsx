import YouTube from "react-youtube";
import PropTypes from "prop-types";
import { useRef, useEffect, useContext } from "react";
import GetTrailerFromDetails from "../../functions/GetTrailerFromDetails";
import { GetaspectRatioVid } from "../../Hooks/fetchVideoInfo";
import { VideoContext } from "./VideoContext";
export function YoutubePlayer({ Trendingdetails }) {
  const {
    setVideoAspect,
    videoAspect,
    isPlaying,
    setIsPlaying,
    isMuted,
    videoFinished,
    setVideoFinished,
  } = useContext(VideoContext);
  const videoId = GetTrailerFromDetails(Trendingdetails);
  const youtubeRef = useRef(null);
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: isPlaying && !videoFinished ? 1 : 0,
      controls: 0,
      rel: 0,
      mute: 1,
    },
  };
  GetaspectRatioVid(setVideoAspect, videoId);
  // handles
  const handleVideoEnd = () => {
    setIsPlaying(false);
    setVideoFinished(true);
  };
  useEffect(() => {
    if (youtubeRef.current)
      if (!isMuted) youtubeRef.current.internalPlayer.unMute();
      else youtubeRef.current.internalPlayer.mute(true);
  }, [isMuted]);
  return (
    <div
      className="absolute h-full w-full sm:-top-[23%] top-[15%]"
      style={{ height: `${100 / videoAspect}vw` }}
    >
      {isPlaying ? (
        <YouTube
          opts={opts}
          videoId={videoId}
          className="w-full h-full opacity-60 pointer-events-none "
          ref={youtubeRef}
          onEnd={handleVideoEnd}
        />
      ) : (
        <img
          className="opacity-60 object-contain h-full w-full"
          src={`https://image.tmdb.org/t/p/original/${Trendingdetails.backdrop_path}`}
        ></img>
      )}
    </div>
  );
}
YoutubePlayer.propTypes = {
  Trendingdetails: PropTypes.object,
};
