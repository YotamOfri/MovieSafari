import { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Episodes from "./Episodes";
import LoadingAnimation from "../../../components/Status/LoadingAnimation";
import ErrorComponent from "../../../components/Status/ErrorComponent";
import Suggestions from "./Suggestions";
import fetchByUrl from "../../../hooks/fetchByurl";
import { useQuery } from "@tanstack/react-query";
export default function InformationMain({ type }) {
  const { id } = useParams();
  const [tab, setTab] = useState(type === "tv" ? "tv" : "suggestions");
  const handleClick = (input) => () => {
    setTab(input);
  };
  const DetailsUrl = `https://api.themoviedb.org/3/${type}/${id}?language=en-US`;
  const { data: details, status } = useQuery([`Information`, id], () =>
    fetchByUrl(DetailsUrl)
  );

  return (
    <div className="flex flex-col gap-5 mx-5  ">
      {status === "success" && (
        <>
          <div className=" border-b-4 border-gray-600 pt-9">
            <div className="flex gap-10 ">
              {type === "tv" && (
                <div className="relative  z-10" onClick={handleClick("tv")}>
                  <button>Episodes</button>
                  {tab === "tv" && (
                    <span className="absolute -bottom-1 left-0 right-0  border-b-4 border-blue-500"></span>
                  )}
                </div>
              )}
              <div
                className="relative z-10 pb-2"
                onClick={handleClick("suggestions")}
              >
                <button>Suggestions</button>
                {tab === "suggestions" && (
                  <span className="absolute -bottom-1 left-0 right-0  border-b-4 border-blue-500"></span>
                )}
              </div>
            </div>
          </div>
          {tab === "tv" ? (
            <Episodes SeasonNumber={details?.number_of_seasons}></Episodes>
          ) : (
            <Suggestions type={type}></Suggestions>
          )}
        </>
      )}
      {status === "loading" && (
        <div className="w-full h-full flex justify-center items-center pt-20">
          <LoadingAnimation></LoadingAnimation>
        </div>
      )}
      {status === "error" && (
        <div className="w-full h-full flex justify-center items-center pt-20">
          <ErrorComponent></ErrorComponent>
        </div>
      )}
    </div>
  );
}
InformationMain.propTypes = {
  type: PropTypes.string.isRequired,
};
