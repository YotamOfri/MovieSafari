import { useQuery } from "@tanstack/react-query";
import Animefetchtop from "../../../hooks/Anime/Animefetchtop";
export default function Home() {
  const { data } = useQuery(["TopTrendingAnime"], () => Animefetchtop());
  console.log(data);
  return <div>Home</div>;
}
