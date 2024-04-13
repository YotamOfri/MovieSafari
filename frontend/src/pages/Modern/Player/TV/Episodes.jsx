import PropTypes from "prop-types";
import { PlaySquareIcon, ArrowDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import fetchByUrl from "@/hooks/fetchByurl";
import ImageLoad from "@/components/imageLoad";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { updateUrlParams } from "@/utils";
export default function Episodes({
  currentEpisode,
  season,
  id,
  numberOfSeasons,
  setInformationObject,
}) {
  const url = `https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US`;
  const { data, status } = useQuery([`${season} + ${id}`], () =>
    fetchByUrl(url)
  );
  console.log(data, "data Episodes");
  if (status === "loading") {
    return <div></div>;
  }
  const handleClickSeason = (i) => {
    updateUrlParams(`/tv/player/${id}&season=${i}&episode=1`);
    setInformationObject((prev) => ({ ...prev, season: i, episode: 1 }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleClickEpisode = (i) => {
    updateUrlParams(`/tv/player/${id}&season=${season}&episode=${i}`);
    setInformationObject((prev) => ({ ...prev, episode: i }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="relative ">
      {status === "loading" && <div>Loading...</div>}
      {status === "success" && (
        <div className="lg:w-96 w-full lg:h-96 overflow-y-scroll  z-10 h-40 py-2  flex flex-col gap-2">
          <DropdownMenu className="overflow-y-scroll">
            <DropdownMenuTrigger className="h-10 outline-none ">
              <h1 className="text-white flex justify-center items-center">
                <div className="flex gap-2">
                  <PlaySquareIcon className="text-white fill-transparent"></PlaySquareIcon>
                  {data.name}
                </div>
                <ArrowDown size={15}></ArrowDown>
              </h1>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <div className="max-h-40 overflow-y-scroll">
                {Array.from({ length: numberOfSeasons }, (_, i) => (
                  <DropdownMenuItem key={i}>
                    <button
                      className="w-full h-full"
                      onClick={() => handleClickSeason(i + 1)}
                    >
                      <h1 className={` ${season === i + 1 && `text-blue-600`}`}>
                        Season {i + 1}
                      </h1>
                    </button>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex flex-col gap-2 overflow-y-scroll">
            {data.episodes.map((item, index) => (
              <button
                key={index}
                onClick={() => handleClickEpisode(item.episode_number)}
                className="text-left"
              >
                <div
                  className={`w-full z-20 relative overflow-hidden ${
                    currentEpisode == item.episode_number &&
                    "bg-blue-600 text-white"
                  } py-2 cursor-pointer`}
                >
                  <h1 className="px-2 font-bold truncate">
                    Episode {index + 1}: {item.name}
                  </h1>
                  <ImageLoad
                    className="absolute w-full top-0 opacity-20 overflow-hidden"
                    src={item.still_path}
                  ></ImageLoad>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="absolute top-0 left-0 bg-gradient-to-t h-full w-full from-mainBg via-black to-black -z-10 rounded-md" />
    </div>
  );
}
Episodes.propTypes = {
  currentEpisode: PropTypes.number,
  season: PropTypes.number,
  id: PropTypes.number,
  numberOfSeasons: PropTypes.number,
  setInformationObject: PropTypes.func,
};
