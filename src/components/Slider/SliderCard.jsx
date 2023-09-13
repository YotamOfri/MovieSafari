import { Link, useParams } from "react-router-dom";
import ImageLoad from "../imageLoad";
import PropTypes from "prop-types";
export default function SliderCard({ Data, isScrolling, TypeLink }) {
  let { id } = useParams();
  if (TypeLink !== "ep") {
    id = Data.id;
  }
  const linkpath =
    TypeLink !== "ep"
      ? `/${Data.media_type}/${id}`
      : `/tv/player/${id}&season=${Data.season_number}&episode=${Data.episode_number}`;
  return (
    <Link to={!isScrolling && `${linkpath}`}>
      <ImageLoad
        src={
          Data?.poster_path
            ? Data.poster_path
            : Data?.still_path
            ? Data.still_path
            : ""
        }
      ></ImageLoad>
    </Link>
  );
}
SliderCard.propTypes = {
  Data: PropTypes.object,
  isScrolling: PropTypes.bool,
  TypeLink: PropTypes.string,
};
