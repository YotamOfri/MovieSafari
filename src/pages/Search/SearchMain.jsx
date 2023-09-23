import { useState } from "react";
import Search from "./Search/Search";
import AnimeSearch from "./Modern/Search";
import PropTypes from "prop-types";
export default function SearchMain({ Type }) {
  const [type, setType] = useState(Type);
  const [query, setQuery] = useState("");
  const handleClick = (clicktype) => () => {
    setType(clicktype);
  };
  return (
    <div className="text-white pt-24 w-full flex flex-col items-center font-roboto">
      <div className="flex gap-1 bg-blue-600 w-72 h-10 rounded-md justify-center duration-300 ease-in-out items-center  shadow-2xl shadow-blue-400">
        <button
          className={`w-[140px] h-9 rounded-md uppercase duration-300 ease-in-out ${
            type === "Modern" && "bg-[#0c0f18] text-blue-400"
          }`}
          onClick={handleClick("Modern")}
        >
          Modren
        </button>
        <button
          className={`w-[140px] h-9 rounded-md uppercase duration-300 ease-in-out ${
            type === "Anime" && "bg-[#0c0f18] text-blue-400"
          }`}
          onClick={handleClick("Anime")}
        >
          Anime
        </button>
      </div>
      {type === "Anime" ? (
        <Search query={query} setQuery={setQuery}></Search>
      ) : (
        <AnimeSearch query={query} setQuery={setQuery}></AnimeSearch>
      )}
    </div>
  );
}
SearchMain.propTypes = {
  Type: PropTypes.string,
};
