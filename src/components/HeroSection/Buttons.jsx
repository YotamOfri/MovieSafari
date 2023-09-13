import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
export default function Buttons({ ID, type }) {
  const { id } = useParams();

  return (
    <div className="flex gap-3 pb-5">
      <Link
        to={`/${type}/player/${
          type === "movie" ? ID : ID + "&season=1&episode=1"
        }`}
        className="py-3 px-10 rounded-sm bg-white text-black hover:scale-[1.02] font-bold duration-300 ease-out flex justify-center items-center"
      >
        Play
      </Link>
      {!id && (
        <Link
          to={`/${type}/${ID}`}
          className="py-3 px-10 rounded-sm bg-slate-600 hover:scale-[1.02] font-bold duration-300 ease-out flex justify-center items-center"
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
