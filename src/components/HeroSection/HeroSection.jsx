import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import DetailsMovieUrl from "../../utils/DetailsMovieUrl";
import fetchByUrl from "../../hooks/fetchByurl";
import ImageLoad from "../imageLoad";
import Buttons from "./Buttons";

export default function HeroSection({ id, type, Code }) {
  const url = DetailsMovieUrl(id, type);
  const { data: HeroSectionDetails, status } = useQuery(
    [`HeroSectionHomeDetails +${Code}`],
    () => fetchByUrl(url)
  );

  return (
    <div className="relative">
      <div className="h-[300px] font-roboto md:h-[55vh] md:min-h-[550px] relative flex items-end gap-20">
        {status === "success" && (
          <>
            <div className="absolute md:-bottom-[40%] -bottom-[60%] left-0 w-full h-96 bg-gradient-to-b from-transparent to-[#0c0f18] -z-[1]"></div>
            <div className="absolute top-0 md:h-[140%] h-[160%] w-full -z-10 ">
              <ImageLoad
                src={HeroSectionDetails?.backdrop_path}
                className="object-cover h-full w-full opacity-60 absolute -z-10"
              ></ImageLoad>
            </div>
          </>
        )}
        <div className=" px-4 h-full pt-20 md:pt-40 flex flex-col justify-between relative">
          <div className="flex flex-col sm:gap-10">
            <div>
              <h1 className="text-4xl md:text-5xl text-white">
                {type === "movie"
                  ? HeroSectionDetails?.title
                  : HeroSectionDetails?.name}
              </h1>
              <h2>{HeroSectionDetails?.tagline}</h2>
            </div>
            <div className="flex flex-col  gap-2">
              <div className="hidden md:block text-white max-w-[700px] max-h-[200px]">
                {HeroSectionDetails?.overview}
              </div>
              <div className="flex gap-3 sm:pb-0 pb-3 sm:flex-row flex-col ">
                <div className="flex gap-3">
                  {HeroSectionDetails?.genres?.length > 0 &&
                    HeroSectionDetails.genres.map((genre) => {
                      return (
                        <h1
                          className="p-[6px] text-xs rounded-md text-gray-200 bg-slate-900"
                          key={genre.id}
                        >
                          {genre.name}
                        </h1>
                      );
                    })}
                </div>
                {(HeroSectionDetails?.runtime !== undefined ||
                  HeroSectionDetails?.number_of_seasons !== undefined) && (
                  <h1 className="flex items-center text-xs">
                    <span className="w-1 h-1 bg-white rounded-full mr-1"></span>
                    {type === "movie"
                      ? `${HeroSectionDetails?.runtime} Min`
                      : `${HeroSectionDetails?.number_of_seasons} ${
                          HeroSectionDetails?.number_of_seasons === 1
                            ? "Season"
                            : "Seasons"
                        }`}
                  </h1>
                )}
              </div>
            </div>
          </div>
          <Buttons ID={id} type={type}></Buttons>
        </div>
      </div>
    </div>
  );
}

HeroSection.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  Code: PropTypes.string.isRequired,
};
