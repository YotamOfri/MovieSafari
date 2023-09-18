import axios from "axios";
export default async function AnimefetchInfo(id) {
  const url = `https://api.consumet.org/anime/gogoanime/info/${id}`;
  const response = await axios.get(url);
  return response.data;
}
