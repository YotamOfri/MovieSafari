import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const FindYear = (inputString) => {
  if (inputString === undefined) return "Undef";
  const colonIndex = inputString.indexOf(":");
  if (colonIndex !== -1) return inputString.slice(colonIndex + 1).trim();
  else return "Not Found";
};
export default function DisplayResults({ Results }) {
  return (
    <div className="flex flex-wrap justify-center items-center ">
      {Results.map((item) => {
        return (
          <div
            key={item.id}
            className="p-4 pb-10 relative hover:scale-[1.02] duration-300 ease-out"
          >
            <Link to={`/Anime/${item.id}`}>
              <img
                src={item.image}
                className={`md:w-72 md:h-96 w-40 h-[234px] object-cover`}
              ></img>
              <div className="absolute md:w-[290px] md:h-[400px] w-40 h-[250px] top-0 flex flex-col justify-between pt-3 ">
                <div className="flex justify-end w-full">
                  <h1 className="w-20 h-10 md:mr-[1px] mt-[3px] flex justify-center items-center rounded-md rounded-r-none rounded-tl-none bg-black text-white uppercase ">
                    {FindYear(item.releaseDate)}
                  </h1>
                </div>
                <div className="absolute bottom-0 left-0 w-full text-center p-2 bg-[rgba(0,0,0,0.7)] text-white  rounded-t-none">
                  {item.name || item.title || item.original_title}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
DisplayResults.propTypes = {
  Results: PropTypes.array.isRequired,
};
