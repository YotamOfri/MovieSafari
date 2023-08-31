import axios from "axios";
import { options } from "./options";
const fetchTrendingAll = async (apiUrl) => {
  const response = await axios.get(apiUrl, options);
  const filteredResults = response.data.results.filter(
    (item) => item.media_type !== "person"
  );
  return filteredResults;
};

export default fetchTrendingAll;
