import axios from "axios";
import { animeAxiosConfig } from "../config/animeaxiosconfig";
export default async function Animefetchquery({ id }) {
  const url = `http://localhost:3000/meta/anilist/${id}`;
  const response = await axios.get(url, animeAxiosConfig);
  return response.data;
}
