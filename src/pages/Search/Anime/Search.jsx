import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import DisplayResults from "./DisplayResutls";
import LoadingAnimation from "../../../components/Status/LoadingAnimation";
import AnimefetchSearch from "../../../hooks/Anime/AnimefetchSearch";
import ErrorComponent from "../../../components/Status/ErrorComponent";
export default function Search({ query }) {
  const { data, status } = useQuery(["AnimeSearchResult", query], () =>
    AnimefetchSearch(query)
  );

  return (
    <div className="pt-10 px-4 flex flex-col gap-5 relative text-center text-white font-roboto">
      <div>
        {status === "success" && data?.results?.length > 0 && (
          <DisplayResults Results={data.results}></DisplayResults>
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
Search.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
};
