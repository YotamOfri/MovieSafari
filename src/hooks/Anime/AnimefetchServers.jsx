import axios from "axios";
export default async function AnimefetchServers(id) {
  console.log(id);
  const url = `http://localhost:3000/anime/gogoanime/servers/${id}`;
  const response = await axios.get(url);
  return response.data;
}
