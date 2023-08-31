import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchAllNames from "../Hooks/fetchAllNames";

export function FramePlayerTV() {
  const { id } = useParams();
  const numbers = id.match(/\d+/g).map(Number);
  const { data: Feachedname } = useQuery([`${id} + 2222`], () =>
    fetchAllNames(numbers[0], numbers[1])
  );
  const formattedTitle =
    Feachedname &&
    Feachedname[0] &&
    Feachedname[0].title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const navigate = useNavigate();
  const [activeServer, setActiveServer] = useState("server1");
  const server1Url = `https://vidsrc.me/embed/tv?tmdb=${id}`;
  const server2Url = `https://multiembed.mov/directstream.php?video_id=${numbers[0]}&tmdb=1&s=${numbers[1]}&e=${numbers[2]}`;
  const server3Url = `https://databasegdriveplayer.xyz/player.php?type=series&tmdb=${id}`;
  const server4Url = `https://www.2embed.cc/embedanime/${formattedTitle}-episode-${numbers[2]}`;

  const handleServerChange = (server) => {
    setActiveServer(server);
  };

  const onClick = () => {
    navigate(`/tv/${numbers[0]}`);
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center relative">
      <div
        className="absolute top-4 left-4 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
        onClick={onClick}
      >
        <i className="bx bx-arrow-back text-5xl"></i>
      </div>
      {activeServer === "server1" ? (
        <iframe
          src={server1Url}
          className="w-full h-full"
          allowFullScreen="true"
        ></iframe>
      ) : activeServer === "server2" ? (
        <iframe
          src={server2Url}
          className="w-full h-full"
          allowFullScreen="true"
        ></iframe>
      ) : activeServer === "server3" ? (
        <iframe
          src={server3Url}
          className="w-full h-full"
          allowFullScreen="true"
          sandbox="allow-scripts allow-same-origin allow-popups"
        ></iframe>
      ) : (
        <iframe
          src={server4Url}
          className="w-full h-full"
          allowFullScreen="true"
        ></iframe>
      )}
      <div className="mt-4  flex flex-wrap justify-center items-center gap-2 ">
        <button
          onClick={() => handleServerChange("server1")}
          className={`${
            activeServer === "server1" ? "bg-blue-500" : "bg-gray-500"
          } text-white h-12 w-32 rounded hover:bg-blue-600 focus:outline-none transition-all`}
        >
          Server 1
        </button>
        <button
          onClick={() => handleServerChange("server2")}
          className={`${
            activeServer === "server2" ? "bg-green-500" : "bg-gray-500"
          } text-white h-12 w-32 rounded hover:bg-green-600 focus:outline-none transition-all`}
        >
          Server 2 (Better)
        </button>
        <button
          onClick={() => handleServerChange("server3")}
          className={`${
            activeServer === "server3" ? "bg-yellow-500" : "bg-gray-500"
          } text-white h-12 w-32 rounded hover:bg-yellow-600 focus:outline-none transition-all`}
        >
          Server 3 (No Ads)
        </button>
        <button
          onClick={() => handleServerChange("server4")}
          className={`${
            activeServer === "server4" ? "bg-purple-500" : "bg-gray-500"
          } text-white whitespace-pre-line h-12 w-32 rounded hover:bg-purple-600 focus:outline-none transition-all`}
        >
          Server 4 (Anime Only)
        </button>
      </div>
    </div>
  );
}
