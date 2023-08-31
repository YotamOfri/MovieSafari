import axios from "axios";
import { options } from "./options";
const fetchAllNames = async (id, season) => {
  const url = `https://api.themoviedb.org/3/tv/${id}/alternative_titles`;
  const response = await axios.get(url, options);
  const showseason = season > 0 ? `season ${season}` : "";
  console.log(showseason);
  const filteredResults = response.data.results.filter(
    (item) =>
      item.type === `${showseason} romaji` ||
      item.type === `${showseason} Romaji`
  );
  console.log(filteredResults);
  const endResults =
    filteredResults[0] !== undefined
      ? filteredResults
      : response.data.results.filter(
          (item) => item.type === `Romaji` || item.type === `romaji`
        );
  console.log(endResults);
  return endResults;
};
export default fetchAllNames;
