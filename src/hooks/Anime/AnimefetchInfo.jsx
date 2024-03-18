import axios from "axios";
export default async function AnimefetchInfo(id) {
  const url = `http://localhost:3000/meta/anilist/info/${id}`;
  const response = await axios.get(url);
  return response.data;
}
