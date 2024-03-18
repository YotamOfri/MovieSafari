import axios from "axios";
export default async function Animefetchquery({ id }) {
  const url = `http://localhost:3000/meta/anilist/${id}`;
  const response = await axios.get(url);
  return response.data;
}
