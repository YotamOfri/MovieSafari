import axios from "axios";
import { animeAxiosConfig } from "../config/animeAxiosConfig";

export default async function AnimefetchPouplar() {
  const url = "http://localhost:3000/meta/anilist/popular?page=1&perPage=10";
  const response = await axios.get(url, animeAxiosConfig);
  return response.data;
}
