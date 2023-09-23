import { Context } from "../Information";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AnimefetchInfo from "../../../../hooks/Anime/AnimefetchInfo";
export default function Dubbing() {
  const { data, setData, episode, setEpisode } = useContext(Context);
  const [selectedOption, setSelectedOption] = useState(data.subOrDub);
  let TypeCheck;
  if (data.subOrDub === "sub") TypeCheck = data.id + "-dub";
  else TypeCheck = data.id.replace("-dub", "");
  const { data: AnimeInfo, status } = useQuery(["AnimeInfo", TypeCheck], () =>
    AnimefetchInfo(TypeCheck)
  );
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setData(AnimeInfo);
    console.log(AnimeInfo);
    const newURL =
      TypeCheck +
      "-" +
      `episode-${
        AnimeInfo.episodes.length < episode
          ? AnimeInfo.episodes.length
          : episode
      }`;
    if (AnimeInfo.episodes.length < episode)
      setEpisode(AnimeInfo.episodes.length);
    window.history.pushState(null, "", newURL);
  };
  return (
    <div>
      <select
        id="suborDub"
        className="bg-gray-700 rounded-sm duration-300 ease-in-out transition-all w-14 uppercase"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value={data.subOrDub}>{data.subOrDub}</option>
        {status === "success" && (
          <option value={data.subOrDub === "dub" ? "sub" : "dub"}>
            {data.subOrDub === "dub" ? "sub" : "dub"}
          </option>
        )}
      </select>
    </div>
  );
}
