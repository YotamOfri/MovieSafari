import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchDetailsById from "../Hooks/fetchDetailsById";
import { CheckUrlForMediaType } from "./minifunctions/CheckUrlForMediaType";
import { InformationContext } from "./InformationContext";
import { HeroSection } from "./HeroSection/HeroSection";
import { Mainsection } from "./MainSection/Mainsection";
export function InformationPage() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);
  const { id } = useParams();
  const MediaType = CheckUrlForMediaType();
  const { data: FeatchedData } = useQuery([`${id}`], () =>
    fetchDetailsById(id, MediaType)
  );
  const [link, setLink] = useState(id);

  const informationContext = { FeatchedData, MediaType, link, setLink };
  return (
    <div className="h-screen">
      <InformationContext.Provider value={informationContext}>
        <HeroSection></HeroSection>
        <Mainsection></Mainsection>
      </InformationContext.Provider>
    </div>
  );
}
