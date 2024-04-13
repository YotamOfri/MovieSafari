import { useState } from "react";
import Loading from "../../../components/animations/Loading";
import { RightArrowSVG } from "../../../components/AdvancedIcons/RightArrowSVG";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
export default function SubmitButton({ onClick, isPending, text }) {
  const [mosueHover, setMouseHover] = useState(false);
  return (
    <button
      className="text-sm w-full bg-indigo-700 hover:bg-opacity-75 duration-200 ease-in-out h-10 rounded-md font-bold flex items-center justify-center gap-1 group"
      onClick={onClick}
      disabled={isPending}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
    >
      <p>
        {isPending ? (
          <Loading color={"stroke-white z-10"} size={"w-6 h-6"}></Loading>
        ) : (
          text
        )}
      </p>
      <AnimatePresence key={"submitButton"}>
        {mosueHover && !isPending && (
          <motion.div
            className="absolute"
            initial={{ x: 75, opacity: 0 }}
            animate={{ x: 80, opacity: 1 }}
            exit={{ x: 75, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
          >
            <RightArrowSVG fill={"white"}></RightArrowSVG>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  isPending: PropTypes.any,
  onClick: PropTypes.func.isRequired,
};
