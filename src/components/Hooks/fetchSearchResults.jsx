import axios from "axios";
import { options } from "./options";
const fetchSearchResults = async (searchQuery) => {
  const apiUrl = `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=1`;
  const response = await axios.get(apiUrl, options);
  const filteredResults = response.data.results.filter(
    (item) => item.media_type !== "person" && item.backdrop_path
  );
  return filteredResults;
};

export default fetchSearchResults;
