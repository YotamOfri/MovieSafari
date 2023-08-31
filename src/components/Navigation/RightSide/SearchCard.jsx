import PropTypes from "prop-types";
import GetInfoFromDetails from "../../functions/GetInfoFromDetails";
export function SearchCard({ result, details }) {
  const information = GetInfoFromDetails(details);
  return (
    <div className="flex flex-row-reverse w-full items-center justify-end outline-none">
      <div className="w-52 flex flex-col">
        <h1 className="">{result.name ? result.name : result.title}</h1>
        <div className="flex gap-5">
          <h1>{result.media_type.toUpperCase()}</h1>
          <h1>{information[0]}</h1>
          <h1>{information[1]}</h1>
        </div>
      </div>
      <div className="w-20 h-20">
        {
          <img
            className="w-20 h-20 object-contain flex  items-center text-center"
            src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
            alt={`${result.title} Poster`}
          ></img>
        }
      </div>
    </div>
  );
}
SearchCard.propTypes = {
  result: PropTypes.object,
  details: PropTypes.object,
};
