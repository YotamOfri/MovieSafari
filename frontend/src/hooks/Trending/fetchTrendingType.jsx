import axios from "axios";
import { options } from "../options";
export default async function fetchTrendingType(apiUrl) {
  const response = await axios.get(apiUrl, options);
  return response.data;
}
