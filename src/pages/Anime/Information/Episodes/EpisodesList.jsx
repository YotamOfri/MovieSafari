import PropTypes from "prop-types";
import { useContext } from "react";
import { Context } from "../Information";
export default function EpisodesList({ selectedOption }) {
  const { data } = useContext(Context);
  console.log(typeof data.episodes.length);
  const number = selectedOption === -1 ? data.episodes.length : "2";
  const divArray = Array.from({ length: number }, (_, index) => index + 1);
  return (
    <div className="">
      {divArray.map((index) => (
        <div key={index}>{index}</div>
      ))}
    </div>
  );
}

EpisodesList.propTypes = {
  selectedOption: PropTypes.number.isRequired,
};
