import YouTube from "react-youtube";
import PropTypes from "prop-types";
import { useRef, useEffect, useContext, useState } from "react";
import GetTrailerFromDetails from "../../functions/GetTrailerFromDetails";
import { GetaspectRatioVid } from "../../Hooks/fetchVideoInfo";
import { TrailerContext } from "./TrailerContext";

export function TrailerRender({ details }) {
  const {
    setVideoAspect,
    videoAspect,
    isPlaying,
    setIsPlaying,
    isMuted,
    videoFinished,
    setVideoFinished,
    setVideoId,
    videoId,
  } = useContext(TrailerContext);

  const [videoError, setVideoError] = useState(false);

  setVideoId(GetTrailerFromDetails(details));
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

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setVideoFinished(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  useEffect(() => {
    if (youtubeRef.current) {
      if (!isMuted) youtubeRef.current.internalPlayer.unMute();
      else youtubeRef.current.internalPlayer.mute(true);
    }
  }, [isMuted]);

  return (
    <div
      className="absolute h-full w-full sm:-top-[23%] top-[15%]"
      style={{ height: `${100 / videoAspect}vw` }}
    >
      {isPlaying && videoId.length > 0 && !videoError ? (
        <YouTube
          opts={opts}
          videoId={videoId}
          className="w-full h-full opacity-60 pointer-events-none "
          ref={youtubeRef}
          onEnd={handleVideoEnd}
          onError={handleVideoError}
        />
      ) : (
        <img
          className="opacity-60 object-contain w-full"
          src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`}
        ></img>
      )}
    </div>
  );
}

TrailerRender.propTypes = {
  details: PropTypes.object,
};
