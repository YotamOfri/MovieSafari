import axios from "axios";
export default async function AnimefetchPouplar() {
  const url = "https://api.consumet.org/anime/gogoanime/top-airing";
  const response = await axios.get(url);
  return response.data;
}
