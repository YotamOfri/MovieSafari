import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import ServerButtons from "./ServerButtons";
import servers from "../../../context/servers";
import PropTypes from "prop-types";
import Frame from "./Frame";
import { useQuery } from "@tanstack/react-query";
import fetchByUrl from "../../../hooks/fetchByurl";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function Player({ type }) {
  const { id } = useParams();
  const [activeServer, setActiveServer] = useState(0);
  const info = id.match(/\d+/g).map(Number);
  const ServerArray = servers(type, info);
  const handleServerChange = (server) => {
    setActiveServer(server);
  };
  const { data } = useQuery(["EpisodeData", id], () =>
    fetchByUrl(
      `https://api.themoviedb.org/3/tv/${info[0]}/season/${info[1]}?language=en-US`
    )
  );
  console.log(data);
  const LastEpisode = data?.episodes[data.episodes.length - 1].episode_number;

  return (
    <div className="relative">
      <Frame src={ServerArray[activeServer]} sandbox={false}></Frame>
      <div className="flex w-full justify-center md:items-center mt-4 md:gap-2">
        {info[2] > 1 && (
          <Link
            to={`/${type}/player/${info[0]}&season=${info[1]}&episode=${
              info[2] - 1
            }`}
            className="bg-gray-500 text-white h-10 w-10 rounded-full hover:bg-red-600 focus:outline-none transition-all flex items-center justify-center"
          >
            <FaArrowLeft className="w-5 h-5" />
          </Link>
        )}
        <ServerButtons
          activeServer={activeServer}
          handleServerChange={handleServerChange}
        ></ServerButtons>
        {LastEpisode !== info[2] && (
          <Link
            to={`/${type}/player/${info[0]}&season=${info[1]}&episode=${
              info[2] + 1
            }`}
            className="bg-gray-500 text-white h-10 w-10 rounded-full hover:bg-purple-400 focus:outline-none transition-all flex items-center justify-center"
          >
            <FaArrowRight className="w-5 h-5" />
          </Link>
        )}
      </div>
      <Link
        to={`/${type}/${info[0]}`}
        className="absolute top-5 left-2 md:text-gray-500 text-white md:hover:text-white hover:scale-110 duration-300 ease-in-out"
      >
        <BiArrowBack size={32} />
      </Link>
    </div>
  );
}
Player.propTypes = {
  type: PropTypes.string.isRequired,
};
