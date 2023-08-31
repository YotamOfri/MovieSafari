import axios from "axios";
import { options } from "./options";
const fetchSeriesEpisodes = async (id, season) => {
  const url = `https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US`;
  const response = await axios.get(url, options);
  return response.data;
};
export default fetchSeriesEpisodes;
