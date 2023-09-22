import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DisplayResults from "./DisplayResutls";
import LoadingAnimation from "../../../components/Status/LoadingAnimation";
import AnimefetchSearch from "../../../hooks/Anime/AnimefetchSearch";
import ErrorComponent from "../../../components/Status/ErrorComponent";
export default function Search() {
  const [query, setQuery] = useState("");
  const { data, status } = useQuery(["AnimeSearchResult", query], () =>
    AnimefetchSearch(query)
  );
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  console.log(data);
  let filterdResults;
  if (status === "success") {
    filterdResults = data.results?.filter(
      (result) => !result.id.includes("dub")
    );
  }
  return (
    <div className="md:pt-20 pt-24 px-4 flex flex-col gap-5 relative text-center text-white font-roboto">
      <h1 className="text-5xl">Anime Search</h1>
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
      <div>
        {status === "success" && data?.results?.length > 0 && (
          <DisplayResults Results={filterdResults}></DisplayResults>
        )}
        {status === "loading" && (
          <div className="h-5/6 w-full flex justify-center items-start pt-5">
            <LoadingAnimation></LoadingAnimation>
          </div>
        )}
        {status === "error" && (
          <div className="h-5/6 w-full flex justify-center items-start pt-5">
            <ErrorComponent></ErrorComponent>
          </div>
        )}
        {data?.results?.length === 0 &&
          query.length > 0 &&
          status !== "loading" && (
            <div className="text-white w-full text-center pt-5">No Result</div>
          )}
      </div>
    </div>
  );
}
