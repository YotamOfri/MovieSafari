import "../../../Styles/SearchAnimation.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchSearchResults from "../../Hooks/fetchSearchResults";
import { SearchCard } from "./SearchCard";
import useDetailsById from "../../functions/useDetailsById";
import { Link } from "react-router-dom";
export function Search() {
  // States
  const [searchQuery, setSearchQuery] = useState("");
  // Fetching Data From Api's
  const { data: searchResults } = useQuery([searchQuery], () =>
    fetchSearchResults(searchQuery)
  );
  const idMediaPairs = searchResults
    ? searchResults.map((result) => [result.id, result.media_type])
    : [];
  const { data: details } = useDetailsById(idMediaPairs, "Search");

  // handle's
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="sm:static absolute  top-24 h-20 left-0 w-full flex justify-center items-center ">
      <div>
        <input
          type="text"
          placeholder="Search"
          className="animate-width h-10 outline-none border-b border-blue-950 bg-slate-500 pl-2 rounded-sm sm:bg-transparent"
          value={searchQuery}
          onChange={handleChange}
        ></input>

        {searchResults && details && (
          <ul
            className={`absolute mt-2  ${
              searchQuery.length > 0 && ""
            } overflow-scroll w-80 outline-none sm:left-0 animate-height flex flex-col gap-4`}
          >
            {searchResults.map((result, index) => {
              return (
                <li
                  key={result.id}
                  className="w-full border  bg-slate-400 bg-opacity-20  outline-none z-40"
                >
                  <Link to={`${result.media_type}/${result.id}`}>
                    <SearchCard
                      result={result}
                      details={details[index]}
                    ></SearchCard>
                  </Link>
                </li>
              );
            })}
            <li className="outline-none cursor-pointer px-2">All Results</li>
          </ul>
        )}
      </div>
    </div>
  );
}
