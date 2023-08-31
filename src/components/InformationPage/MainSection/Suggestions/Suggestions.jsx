import { useContext } from "react";
import { InformationContext } from "../../InformationContext";
import fetchRecommendations from "../../../Hooks/fetchRecommendations";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { SugSlider } from "./SugSlider";
export function Suggestions() {
  const { FeatchedData, MediaType } = useContext(InformationContext);
  const { id } = useParams();
  const { data: FeatchedRecom } = useQuery([`${id + 2323}`], () =>
    fetchRecommendations(id, MediaType)
  );

  return (
    <div>
      {FeatchedRecom && FeatchedRecom.results.length > 0 && (
        <SugSlider FeatchedRecom={FeatchedRecom.results}></SugSlider>
      )}
    </div>
  );
}
