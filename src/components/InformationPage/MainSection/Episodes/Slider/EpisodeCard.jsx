import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
export function EpisodeCard({ Data, isScrolling }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleClick = () => {
    if (isScrolling) return;
    navigate(
      `/tv/player/${id}&season=${Data.season_number}&episode=${Data.episode_number}`
    );
  };
  return (
    <>
      <div onClick={handleClick}>
        <img
          className="rounded-sm h-60 object-cover"
          src={`https://image.tmdb.org/t/p/original${Data.still_path}`}
          alt=""
        />
        <h1>Episode {Data.episode_number}</h1>
      </div>
    </>
  );
}
EpisodeCard.propTypes = {
  Data: PropTypes.object,
  isScrolling: PropTypes.bool,
};
