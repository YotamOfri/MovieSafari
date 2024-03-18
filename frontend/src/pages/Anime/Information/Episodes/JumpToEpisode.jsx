import { useContext, useState } from "react";
import { Context } from "../Information";
export default function JumpToEpisode() {
  const [query, setQuery] = useState("");
  const { data, setEpisode } = useContext(Context);
  const handleChange = (e) => {
    if (!isNaN(Number(e.target.value))) {
      setQuery(e.target.value);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && data.episodes.length >= parseInt(e.target.value)) {
      const id = data.episodes[parseInt(e.target.value) - 1].id;
      setEpisode(parseInt(e.target.value));
      const newURL = id; // New URL path
      window.history.pushState(null, "", newURL);
      setQuery("");
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Jump To Episode"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="bg-gray-700 outline-none 2xl:w-[120px] w-28 rounded-sm placeholder:text-xs"
      />
    </div>
  );
}
