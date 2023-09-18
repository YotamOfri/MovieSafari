import { Context } from "../Information";
import { useContext } from "react";
import PropTypes from "prop-types";
export default function DropDown({ selectedOption, setSelectedOption }) {
  const { data } = useContext(Context);
  const sections = Math.round(data.episodes.length / 100);
  const handleOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
  };
  return (
    <div className="flex items-center">
      {sections > 0 ? (
        <select
          id="dropdown"
          className="bg-gray-700 rounded-sm duration-300 ease-in-out transition-all w-28"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          {Array.from({ length: sections }, (_, index) => (
            <option key={index} value={index}>
              {`${index === 0 ? 1 : index * 100} - ${
                index + 1 === sections
                  ? data.episodes.length
                  : (index + 1) * 100 - 1
              }`}
            </option>
          ))}
        </select>
      ) : (
        <div className="bg-gray-700 w-20 rounded-sm flex justify-center">
          1 - {data.episodes.length}
        </div>
      )}
    </div>
  );
}
DropDown.propTypes = {
  selectedOption: PropTypes.number.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
};
