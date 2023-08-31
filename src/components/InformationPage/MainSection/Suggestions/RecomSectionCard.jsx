import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
export function RecomSectionCard({ Data, isScrolling }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (isScrolling) return;
    navigate(`/${Data.media_type}/${Data.id}`);
  };
  return (
    <>
      <div onClick={handleClick}>
        <img
          className="rounded-sm"
          src={`https://image.tmdb.org/t/p/original${Data.poster_path}`}
          alt=""
          loading="lazy"
        />
      </div>
    </>
  );
}
RecomSectionCard.propTypes = {
  Data: PropTypes.object,
  isScrolling: PropTypes.bool,
};
