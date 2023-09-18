import { useState, useEffect } from "react";
import { Blurhash } from "react-blurhash";
import PropTypes from "prop-types";
import "../../../assets/ImageLoaderAnimeLink.css"; // Import the CSS file with your animation

export default function AniListImage({ className, imgclass, src, blurHash }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setImageLoaded(true);
    };
  }, [src]);
  return (
    <div className={` ${className} `}>
      {imageLoaded ? (
        <img
          src={src}
          className={`${imgclass} animated`} // Apply the animation class
          loading="lazy"
          alt=""
        />
      ) : (
        <div className={`${imgclass} blurhash-container`}>
          <Blurhash hash={blurHash} width="100%" height="100%" />
        </div>
      )}
    </div>
  );
}

AniListImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  imgclass: PropTypes.string.isRequired,
  blurHash: PropTypes.string.isRequired,
};
