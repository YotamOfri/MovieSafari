import axios from "axios";
import { options } from "./options";
const fetchDetailsById = async (id, media_type) => {
  const url =
    media_type === "tv"
      ? `https://api.themoviedb.org/3/tv/${id}?append_to_response=videos&language=en-US`
      : `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos&language=en-US`;
  const response = await axios.get(url, options);
  return response.data;
};
export default fetchDetailsById;
