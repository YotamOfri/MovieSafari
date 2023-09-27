import { useState } from "react";
import AnimeSearch from "./Anime/Search";
import ModernSearch from "./Modern/Search";
import PropTypes from "prop-types";
export default function SearchMain({ Type }) {
  const [type, setType] = useState(Type);
  const [query, setQuery] = useState("");
  const handleClick = (clicktype) => () => {
    setType(clicktype);
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div className="text-white pt-24 w-full gap-10 flex flex-col items-center font-roboto">
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
      <div className="w-full flex justify-center items-center ">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          value={query}
          onChange={handleChange}
          className="outline-none w-64 md:w-[400px] bg-transparent border-b-2 border-slate-800 text-white"
        />
      </div>
      {type === "Anime" && query?.length > 0 ? (
        <AnimeSearch query={query}></AnimeSearch>
      ) : (
        query?.length > 0 && <ModernSearch query={query}></ModernSearch>
      )}
    </div>
  );
}
SearchMain.propTypes = {
  Type: PropTypes.string,
};
