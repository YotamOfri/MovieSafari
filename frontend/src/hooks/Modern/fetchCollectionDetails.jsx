import axios from "axios";
import { options } from "../options";
export default async function fetchCollectionDetails(id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/collection/${id}?language=en-US`,
    options
  );
  return response.data;
}
