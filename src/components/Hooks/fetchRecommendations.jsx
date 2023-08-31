import axios from "axios";
import { options } from "./options";
const fetchRecommendations = async (id, media_type) => {
  const url =
    media_type === "tv"
      ? `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`
      : `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`;
  const response = await axios.get(url, options);
  return response.data;
};
export default fetchRecommendations;
