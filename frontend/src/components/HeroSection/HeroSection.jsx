import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import DetailsMovieUrl from "../../utils/DetailsMovieUrl";
import fetchByUrl from "../../hooks/fetchByurl";
import ImageLoad from "../imageLoad";
import Buttons from "./Buttons";
import BookmarkBtn from "../Inputs/Bookmark";
import { useContext } from "react";
import { WebsiteContext } from "../../context/WebsiteContext";
export default function HeroSection({ id, type, Code }) {
  const { user } = useContext(WebsiteContext);
  const url = DetailsMovieUrl(id, type);
  const { data, status } = useQuery([`HeroSectionHomeDetails +${Code}`], () =>
    fetchByUrl(url)
  );
  return (
    <div className="relative">
      <div className="h-[300px] font-roboto md:h-[55vh] md:min-h-[550px] relative flex items-end gap-20">
        {status === "success" && (
          <>
            <div className="absolute md:-bottom-[50%] -bottom-[60%] left-0 w-[100vw] h-96 bg-gradient-to-b from-transparent to-[#0c0f18] -z-[1]" />
            <div className="absolute top-0 md:h-[140%] h-[160%] w-full -z-10">
              <ImageLoad
                src={data?.backdrop_path}
                className="object-cover h-full w-full opacity-60 absolute -z-10 "
              ></ImageLoad>
            </div>
          </>
        )}
        <div className="px-4 w-full h-full pt-28 md:pt-40 flex flex-col justify-between relative">
          <div className="flex flex-col gap-2 sm:gap-10">
            <div>
              <h1 className="text-4xl md:text-5xl text-white">
                {type === "movie" ? data?.title : data?.name}
              </h1>
              <h2>{data?.tagline}</h2>
            </div>
            <div className="flex flex-col gap-2">
              <div className="hidden md:block text-white max-w-[700px] max-h-[200px]">
                {data?.overview}
              </div>
              <div className="flex gap-3 sm:pb-0 pb-3 flex-row flex-wrap ">
                <div className="flex gap-3">
                  {data?.genres?.length > 0 &&
                    data.genres.map((genre) => {
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
                {(data?.runtime !== undefined ||
                  data?.number_of_seasons !== undefined) && (
                  <h1 className="flex items-center text-xs">
                    <span className="w-1 h-1 bg-white rounded-full mr-1"></span>
                    {type === "movie"
                      ? `${data?.runtime} Min`
                      : `${data?.number_of_seasons} ${
                          data?.number_of_seasons === 1 ? "Season" : "Seasons"
                        }`}
                  </h1>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full items-center">
            <Buttons ID={id} type={type}></Buttons>
            {user && (
              <BookmarkBtn
                className="cursor-pointer"
                id={id}
                type={type}
              ></BookmarkBtn>
            )}
          </div>
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
