import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export function MainSectionCard({ Data, isScrolling }) {
  return (
    <>
      <Link to={!isScrolling && `${Data.media_type}/${Data.id}`}>
        <img
          className="rounded-sm"
          src={`https://image.tmdb.org/t/p/original${Data.poster_path}`}
          alt=""
        />
      </Link>
    </>
  );
}
MainSectionCard.propTypes = {
  Data: PropTypes.object,
  isScrolling: PropTypes.bool,
};
