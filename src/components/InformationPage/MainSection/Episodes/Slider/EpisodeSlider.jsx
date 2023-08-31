import Slider from "react-slick";
import PropTypes from "prop-types";
import { EpisodeCard } from "./EpisodeCard";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export function EpisodeSlider({ FeatchedEpisodes }) {
  const [isScrolling, setIsScrolling] = useState(false);
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    beforeChange: () => setIsScrolling(true),
    afterChange: () => setIsScrolling(false),
    responsive: [
      {
        breakpoint: 2024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {FeatchedEpisodes.map((Data) => {
          return (
            <div
              key={Data.id}
              className={`flex gap-5 px-1 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out `}
            >
              <EpisodeCard Data={Data} isScrolling={isScrolling}></EpisodeCard>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
EpisodeSlider.propTypes = {
  FeatchedEpisodes: PropTypes.array,
};
