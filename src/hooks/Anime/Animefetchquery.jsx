import axios from "axios";
export default async function Animefetchquery({ id }) {
  const url = `https://api.consumet.org/meta/anilist/${id}`;
  const response = await axios.get(url);
  return response.data;
}
