import axios from "axios";
import { animeAxiosConfig } from "../config/animeaxiosconfig";
export default async function AnimefetchSearch(query) {
  const url = `http://localhost:3000/meta/anilist/${query}`;
  const response = await axios.get(url, animeAxiosConfig);
  return response.data;
}
