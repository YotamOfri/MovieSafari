import { useState, useEffect } from "react";
import PropTypes from "prop-types";
export default function ImageLoad({ className, src, imgclass, size }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const image = new Image();
    image.src = `https://image.tmdb.org/t/p/${size ? size : "original"}/${src}`;
    image.onload = () => {
      setImageLoaded(true);
    };
    const imgElement = document.getElementById("preload-image");
    if (imgElement) {
      imgElement.loading = size ? "lazy" : "eager";
    }
  }, [src, size]);
  return (
    <div className={`bg-slate-900 shadow-md ${className} `}>
      <img
        id="preload-image"
        src={`https://image.tmdb.org/t/p/${
          imageLoaded ? (size ? size : "original") : "w300"
        }/${src}`}
        className={`object-cover h-full w-full min-h-[200px] ${imgclass} ${
          !imageLoaded && "blur"
        }`}
        alt=""
      />
    </div>
  );
}
ImageLoad.propTypes = {
  className: PropTypes.string,
  imgclass: PropTypes.string,
  src: PropTypes.string.isRequired,
  size: PropTypes.string,
};
