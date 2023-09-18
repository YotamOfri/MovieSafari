import axios from "axios";
export default async function AnimefetchServers(id) {
  const url = `https://api.consumet.org/anime/gogoanime/servers/${id}`;
  const response = await axios.get(url);
  return response.data;
}
