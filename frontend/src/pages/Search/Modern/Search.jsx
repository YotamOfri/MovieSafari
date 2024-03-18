import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import fetchByUrl from "../../../hooks/fetchByurl";
import FilterList from "../../../utils/FilterList";
import DisplayResults from "./DisplayResults";
import LoadingAnimation from "../../../components/Status/LoadingAnimation";
export default function Search({ query }) {
  const { data: SearchResult, status } = useQuery(["SearchResult", query], () =>
    fetchByUrl(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`
    )
  );
  const FilterdResult =
    SearchResult?.results?.length > 0 ? FilterList(SearchResult) : "No Result";

  return (
    <div className="pt-10 px-4 relative">
      <div>
        {status === "success" && FilterdResult !== "No Result" && (
          <DisplayResults FilterdResult={FilterdResult}></DisplayResults>
        )}
        {status === "loading" && (
          <div className="h-5/6 w-full flex justify-center items-start pt-5">
            <LoadingAnimation></LoadingAnimation>
          </div>
        )}
        {FilterdResult === "No Result" &&
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
