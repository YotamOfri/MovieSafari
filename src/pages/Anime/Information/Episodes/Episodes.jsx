import { Context } from "../Information";
import { useContext, useEffect, useState } from "react";
import DropDown from "./DropDown";
import JumpToEpisode from "./JumpToEpisode";
import EpisodesList from "./EpisodesList";
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
    <div className=" p-4 md:w-[29%] lg:min-h-[700px] lg:h-[90vh] bg-neutral-950 flex flex-col text-white">
      {/* top row */}
      <div className="flex gap-2 flex-wrap">
        <DropDown
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        ></DropDown>
        <JumpToEpisode></JumpToEpisode>
      </div>
      <div>
        <EpisodesList selectedOption={selectedOption}></EpisodesList>
      </div>
    </div>
  );
}
