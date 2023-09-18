import PropTypes from "prop-types";
export default function ServerButtons({ activeServer, handleServerChange }) {
  return (
    <div className="  flex flex-wrap justify-center items-center gap-2 ">
      <button
        onClick={() => handleServerChange(0)}
        className={`${
          activeServer === 0 ? "bg-blue-500" : "bg-gray-500"
        } text-white h-12 w-32 rounded hover:bg-blue-600 focus:outline-none transition-all`}
      >
        Server 1
      </button>
      <button
        onClick={() => handleServerChange(1)}
        className={`${
          activeServer === 1 ? "bg-green-500" : "bg-gray-500"
        } text-white h-12 w-32 rounded hover:bg-green-600 focus:outline-none transition-all`}
      >
        Server 2
      </button>
      <button
        onClick={() => handleServerChange(2)}
        className={`${
          activeServer === 2 ? "bg-yellow-500" : "bg-gray-500"
        } text-white h-12 w-32 rounded hover:bg-yellow-600 focus:outline-none transition-all`}
      >
        Server 3
      </button>
    </div>
  );
}

ServerButtons.propTypes = {
  activeServer: PropTypes.number.isRequired,
  handleServerChange: PropTypes.func.isRequired,
};
