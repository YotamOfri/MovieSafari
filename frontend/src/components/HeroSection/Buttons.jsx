import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
export default function Buttons({ ID, type }) {
  const { id } = useParams();
  const LinksPath = {
    play:
      `/${type}/player/` + (type === "movie" ? ID : ID + "&season=1&episode=1"),
    details: `/${type}/` + ID,
  };
  return (
    <div className="flex gap-3 pb-5">
      <Link
        to={LinksPath.play}
        className="w-40 bg-white block px-4 py-2 text-center duration-200 ease-in-out  rounded-md font-semibold text-gray-700 hover:bg-gray-100"
      >
        Play
      </Link>
      {!id && (
        <Link
          to={LinksPath.details}
          className="w-40 bg-slate-800 block px-4 py-2 text-center duration-200 ease-in-out  rounded-md font-semibold text-gray-500 hover:bg-gray-900 hover:text-gray-300 "
        >
          More Details
        </Link>
      )}
    </div>
  );
}
Buttons.propTypes = {
  ID: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
