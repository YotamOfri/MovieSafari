import { motion } from "framer-motion";
import PropTypes from "prop-types";
export default function Backdrop({ onClick, children, side }) {
  return (
    <motion.div
      className={`absolute top-0 left-0 h-screen w-screen bg-black/60 flex ${side} md:items-center overflow-auto`}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
Backdrop.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.object,
  side: PropTypes.string,
};
