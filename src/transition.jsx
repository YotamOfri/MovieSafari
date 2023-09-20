import { motion } from "framer-motion";
const transition = (OriginalComponent, path) => {
  return (
    <>
      <motion.div
        key={path}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: [1, 1, 0.36, 1] }}
      >
        {OriginalComponent}
      </motion.div>
    </>
  );
};
export default transition;
