import ImageLoad from "@/components/imageLoad";
import fetchByUrl from "@/hooks/fetchByurl";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import servers from "@/context/servers";
import Frame from "../Frame";
import { ServerIcon } from "lucide-react";
import Information from "./Information";
import Loading from "@/components/Animations/Loading";
import Episodes from "./Episodes";

export default function TvPlayer() {
  const { id } = useParams();
  const [tvId, season, episode] = id.match(/\d+/g).map(Number);
  const [informationObject, setInformationObject] = useState({
    id: tvId,
    season: season,
    episode: episode,
  });
  const [activeServer, setActiveServer] = useState(0);
  const server = servers("tv", [
    informationObject.id,
    informationObject.season,
    informationObject.episode,
  ]);
  const url = `https://api.themoviedb.org/3/tv/${tvId}`;
  const { data, status } = useQuery(["MoviePlayer", id], () => fetchByUrl(url));

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div className="relative flex flex-col justify-center">
      <div className="relative md:h-[90vh] h-[300px] overflow-hidden min-h-[200px]">
        <ImageLoad
          src={data.backdrop_path}
          alt={data.title}
          imgclass="rounded-md"
          className="w-full absolute -z-10 h-full object-cover filter blur-[1px] overflow-hidden"
        />
        <Frame src={server[activeServer]} className="h-full p-4 px-8 z-10" />
        <div className="absolute bottom-0 h-20 w-full bg-gradient-to-b from-transparent to-[#0c0f18] -z-[1]" />
      </div>
      <div className="w-full flex gap-2 justify-center items-center flex-col text-gray-500 ">
        <p className="text-center">
          If current server doesn&apos;t work please try other server below.
        </p>
        <div className="flex gap-3 md:bg-black rounded-3xl text-gray-500 flex-wrap justify-center">
          {["VidPlay", "VidSrc", "Multiembed"].map((serverName, index) => (
            <button
              key={index}
              className={`flex gap-2 p-3 md:px-3 px-5 ${
                activeServer === index
                  ? "text-white bg-slate-900"
                  : "bg-zinc-950"
              } ${
                index === 0
                  ? "md:rounded-l-3xl rounded-xl"
                  : index === 1
                  ? "rounded-xl"
                  : "md:rounded-r-3xl rounded-xl"
              } duration-300 ease-in-out`}
              onClick={() => setActiveServer(index)}
            >
              {serverName}
              <ServerIcon />
            </button>
          ))}
        </div>
        <div className="flex lg:flex-row flex-col-reverse px-5 gap-2 w-full">
          <Information
            banner={data?.poster_path}
            title={data?.name}
            productionCompanies={data?.production_companies}
            productionCountries={data?.production_countries}
            description={data?.overview}
            duration={data?.episode_run_time[0]}
            genres={data?.genres}
            date={data?.first_air_date}
            rating={data?.vote_average.toFixed(1)}
            type={"TV"}
            id={id}
          />
          <Episodes
            currentEpisode={informationObject.episode}
            id={tvId}
            season={informationObject.season}
            numberOfSeasons={data?.number_of_seasons}
            setInformationObject={setInformationObject}
          />
        </div>
      </div>
      <Link
        to={`/${"tv"}/${tvId}`}
        className="absolute top-5 left-2 md:text-gray-500 text-white md:hover:text-white hover:scale-110 duration-300 ease-in-out"
      >
        <BiArrowBack size={32} />
      </Link>
    </div>
  );
}
