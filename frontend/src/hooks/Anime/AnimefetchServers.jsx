import axios from "axios";
import { animeAxiosConfig } from "../config/animeaxiosconfig";
export default async function AnimefetchServers(id) {
  console.log(id);
  const url = `http://localhost:3000/anime/gogoanime/servers/${id}`;
  const response = await axios.get(url, animeAxiosConfig);
  return response.data;
}
