import ImageLoad from "@/components/imageLoad";
import PropTypes from "prop-types";
import { StarIcon } from "lucide-react";
import { formatDate } from "@/utils";
export default function Information({
  banner,
  title,
  rating,
  genres,
  date,
  duration,
  description,
  type,
  productionCompanies,
  productionCountries,
  id,
}) {
  const additionalInformation = [
    { title: "Type", data: type },
    {
      title: "Country",
      data: productionCountries.map((country) => country.name).join(", "),
    },
    { title: "Genres", data: genres.map((genre) => genre.name).join(", ") },
    { title: "Release", data: formatDate(date) },
    {
      title: "Production",
      data: productionCompanies.map((country) => country.name).join(", "),
    },
  ];

  return (
    <div className="w-full md:p-4 p-4 md:px-2 flex md:justify-start justify-center gap-4 relative">
      <div className="md:relative absolute top-0 -z-10 md:h-auto h-full md:overflow-visible overflow-hidden">
        <ImageLoad
          src={banner}
          imgclass="rounded-md h-72 bg-none"
          className="md:h-80 md:w-60 rounded-md w-full overflow-hidden md:opacity-100 opacity-20"
        ></ImageLoad>
        <div className="absolute inset-0 bg-gradient-to-t from-mainBg via-transparent to-transparent  md:hidden" />
      </div>
      <div className=" flex-col gap-2 text-sm flex md:relative justify-center md:justify-start">
        <h1 className="text-3xl font-bold text-gray-200">{title}</h1>
        <div className="flex gap-2">
          <h1 className="bg-blue-700 text-gray-200 w-fit px-2 rounded-2xl">
            HD
          </h1>
          <div className="text-gray-200 flex gap-2">
            <span className="flex gap-1">
              <StarIcon size={20}></StarIcon>
              {rating}
            </span>
            <span>{date.substring(0, 4)}</span>
            <span>{duration} min</span>
          </div>
        </div>
        <div>{description}</div>
        <div className="flex flex-col gap-1">
          {additionalInformation.map((info, index) => {
            return (
              <div key={index} className="flex gap-2">
                <span className="text-gray-500 w-24 shrink-0">
                  {info.title}:
                </span>
                <span className="text-gray-200">{info.data}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
Information.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  banner: PropTypes.string,
  title: PropTypes.string,
  rating: PropTypes.string,
  genres: PropTypes.array,
  date: PropTypes.string,
  duration: PropTypes.number,
  description: PropTypes.string,
  productionCompanies: PropTypes.array,
  productionCountries: PropTypes.array,
};
