import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchByUrl from "../../../hooks/fetchByurl";
import MainSlider from "../../../components/Slider/MainSlider";
import LoadingAnimation from "../../../components/Status/LoadingAnimation";
import PropTypes from "prop-types";
export default function Episodes({ SeasonNumber }) {
  const { id } = useParams();
  const [season, setSeason] = useState(1);
  const url = `https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US`;
  const { data: episodes, status } = useQuery([`${season} + ${id}`], () =>
    fetchByUrl(url)
  );
  const handleSeasonChange = (number) => () => {
    setSeason(number + 1);
  };
  return (
    <div className="overflow-x-hidden">
      <div className="w-full overflow-x-auto">
        <div className="flex gap-2 items-start w-fit h-14 transition-all duration-300 ease-in-out">
          {SeasonNumber &&
            Array.from({ length: SeasonNumber }, (_, index) => (
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
            ))}
        </div>
      </div>
      {status === "success" && (
        <MainSlider data={episodes.episodes} TypeLink={"ep"}></MainSlider>
      )}
      {status === "loading" && (
        <div className="h-full w-full flex justify-center items-center">
          <LoadingAnimation></LoadingAnimation>
        </div>
      )}
    </div>
  );
}
Episodes.propTypes = {
  SeasonNumber: PropTypes.number,
};
