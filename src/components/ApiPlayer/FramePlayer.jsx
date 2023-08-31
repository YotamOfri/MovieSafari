import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function FramePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeServer, setActiveServer] = useState("server1");
  const server1Url = `https://vidsrc.me/embed/movie?tmdb=${id}`;
  const server2Url = `https://multiembed.mov/?video_id=${id}&tmdb=1$`;
  const server3Url = `https://databasegdriveplayer.xyz/player.php?&tmdb=${id}`;
  const handleServerChange = (server) => {
    setActiveServer(server);
  };
  const onClick = () => {
    navigate(`/movie/${id}`);
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
      ) : (
        <iframe
          src={server3Url}
          className="w-full h-full"
          allowFullScreen="true"
          sandbox="allow-scripts allow-same-origin allow-popups"
        ></iframe>
      )}
      <div className="mt-4 space-x-4">
        <button
          onClick={() => handleServerChange("server1")}
          className={`${
            activeServer === "server1" ? "bg-blue-500" : "bg-gray-500"
          } text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none transition-all`}
        >
          Server 1
        </button>
        <button
          onClick={() => handleServerChange("server2")}
          className={`${
            activeServer === "server2" ? "bg-green-500" : "bg-gray-500"
          } text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none transition-all`}
        >
          Server 2 (Better)
        </button>
        <button
          onClick={() => handleServerChange("server3")}
          className={`${
            activeServer === "server3" ? "bg-yellow-500" : "bg-gray-500"
          } text-white py-2 px-4 rounded hover:bg-yellow-600 focus:outline-none transition-all`}
        >
          Server 3 (No Ads)
        </button>
      </div>
    </div>
  );
}
