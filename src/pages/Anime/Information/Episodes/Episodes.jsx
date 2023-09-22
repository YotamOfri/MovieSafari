import { Context } from "../Information";
import { useContext, useEffect, useState } from "react";
import DropDown from "./DropDown";
import JumpToEpisode from "./JumpToEpisode";
import EpisodesList from "./EpisodesList";
import Dubbing from "./Dubbing";
export default function Episodes() {
  const { data, episode } = useContext(Context);
  const [selectedOption, setSelectedOption] = useState(
    Math.floor(data.episodes.length > 100 ? episode / 100 : -1)
  );
  useEffect(() => {
    if (data.episodes.length > 100)
      setSelectedOption(Math.floor(episode / 100));
  }, [episode]);
  return (
    <div className=" p-4 2xl:w-[350px] 2xl:h-[90vh] w-[90%] overflow-y-scroll h-[300px]  gap-2 bg-neutral-950 flex flex-col items-center  text-white">
      {/* top row */}
      <div className="flex gap-2 justify-center items-center w-full">
        <DropDown
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        ></DropDown>
        <JumpToEpisode></JumpToEpisode>
        <Dubbing></Dubbing>
      </div>
      <div className="flex justify-center items-center w-full">
        <EpisodesList selectedOption={selectedOption}></EpisodesList>
      </div>
    </div>
  );
}
