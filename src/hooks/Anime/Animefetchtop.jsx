import axios from "axios";

export default async function Animefetchtop() {
  const url = "https://api.consumet.org/meta/anilist/trending";
  const response = await axios.get(url);
  return response.data;
}
