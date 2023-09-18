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
    image.src = src; // Assume src is the URL from the AniList API
    image.onload = () => {
      setImageLoaded(true);
    };
  }, [src]);
  return (
    <div className={`bg-slate-900 rounded-md shadow-md ${className} `}>
      <Link to={!isScrolling && `${path}`}>
        <img
          src={src}
          className={`${!imageLoaded && "blur"} h-full`}
          loading="lazy"
          alt=""
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
