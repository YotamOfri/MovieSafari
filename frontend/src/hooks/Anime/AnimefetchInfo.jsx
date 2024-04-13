import axios from "axios";
import { animeAxiosConfig } from "../config/animeAxiosConfig";
export default async function AnimefetchInfo(id) {
  const url = `http://localhost:3000/meta/anilist/info/${id}`;
  const response = await axios.get(url, animeAxiosConfig);
  return response.data;
}
