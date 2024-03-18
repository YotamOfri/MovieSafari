import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function ImageLoaderAnimeLink({
  className,
  src,
  path,
  isScrolling,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setImageLoaded(true);
    };
  }, [src]);
  return (
    <div className={`bg-slate-900 w-full ${className}`}>
      <Link to={!isScrolling && `${path}`}>
        <img
          src={src}
          className={`w-full object-cover sm:h-[30vh] h-[250px] sm:min-h-[300px] rounded-lg ${
            !imageLoaded && "blur"
          }`}
          alt="poster Image"
        />
      </Link>
    </div>
  );
}
ImageLoaderAnimeLink.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  isScrolling: PropTypes.bool,
  path: PropTypes.string.isRequired,
};
