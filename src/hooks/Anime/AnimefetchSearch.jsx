import axios from "axios";
export default async function AnimefetchSearch(query) {
  const url = `https://api.consumet.org/anime/gogoanime/${query}?page=1`;
  const response = await axios.get(url);
  return response.data;
}
