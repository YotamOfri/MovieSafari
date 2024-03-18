import axios from "axios";
export default async function AnimefetchSearch(query) {
  const url = `http://localhost:3000/meta/anilist/${query}`;
  const response = await axios.get(url);
  return response.data;
}
