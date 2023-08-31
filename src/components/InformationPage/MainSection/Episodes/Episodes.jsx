import { InformationContext } from "../../InformationContext";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchSeriesEpisodes from "../../../Hooks/fetchSeriesEpisodes";
import { DisplayEpisodes } from "./DisplayEpisodes";

export function Episodes() {
  const { FeatchedData } = useContext(InformationContext);
  const { id } = useParams();
  const [season, setSeason] = useState(1);

  const handleSeasonChange = (number) => () => {
    setSeason(number + 1);
  };

  const { data: FeatchedEpisodes } = useQuery([`${season} + 132`], () =>
    fetchSeriesEpisodes(id, season)
  );

  return (
    <div className="overflow-x-hidden">
      <div className="w-full overflow-x-auto">
        <div className="flex gap-2 items-start w-fit h-14 transition-all duration-300 ease-in-out">
          {FeatchedData &&
            Array.from(
              { length: FeatchedData.number_of_seasons },
              (_, index) => (
                <button
                  onClick={handleSeasonChange(index)}
                  key={index + 1}
                  className={`w-20 h-10 text-white ${
                    season === index + 1
                      ? "bg-blue-500"
                      : "bg-gray-800 hover:bg-gray-700"
                  } rounded-md cursor-pointer focus:outline-none`}
                >
                  Season {index + 1}
                </button>
              )
            )}
        </div>
      </div>
      {FeatchedEpisodes && (
        <DisplayEpisodes FeatchedEpisodes={FeatchedEpisodes}></DisplayEpisodes>
      )}
    </div>
  );
}
