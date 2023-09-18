import PropTypes from "prop-types";
import { useContext } from "react";
import { Context } from "../Information";
export default function EpisodesList({ selectedOption }) {
  const { data, episode, setEpisode } = useContext(Context);
  const start = selectedOption === 0 ? 1 : selectedOption * 100;
  const end =
    selectedOption + 1 === Math.ceil(data.episodes.length / 100)
      ? data.episodes.length
      : (selectedOption + 1) * 100 - 1;
  const number = selectedOption === -1 ? data.episodes.length : end - start;
  const divArray =
    selectedOption !== -1
      ? Array.from({ length: number + 1 }, (_, index) => index + start)
      : Array.from({ length: number }, (_, index) => index + 1);
  const handleClick = (index) => () => {
    const id = data.episodes[index - 1].id;
    setEpisode(index);
    const newURL = id; // New URL path
    window.history.pushState(null, "", newURL);
  };
  return (
    <div className="flex flex-wrap gap-2 w-full  font-roboto text-gray-400 2xl:justify-start justify-center items-center">
      {divArray.map((index) => (
        <div
          className={`2xl:w-[17.5%] md:w-[9%] w-[17.5%] text-sm 2xl:h-7 h-9 rounded-sm justify-center items-center flex cursor-pointer ${
            index == episode ? `bg-slate-900` : "bg-slate-800"
          }`}
          onClick={handleClick(index)}
          key={index}
        >
          {index}
        </div>
      ))}
    </div>
  );
}

EpisodesList.propTypes = {
  selectedOption: PropTypes.number.isRequired,
};
