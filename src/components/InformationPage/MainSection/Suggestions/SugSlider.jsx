import Slider from "react-slick";
import PropTypes from "prop-types";
import { RecomSectionCard } from "./RecomSectionCard";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export function SugSlider({ FeatchedRecom }) {
  const [isScrolling, setIsScrolling] = useState(false);
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    beforeChange: () => setIsScrolling(true),
    afterChange: () => setIsScrolling(false),
    responsive: [
      {
        breakpoint: 2024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
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
        {FeatchedRecom.map((Data) => {
          return (
            <div
              key={Data.id}
              className={`flex gap-5 px-1 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out `}
            >
              <RecomSectionCard
                Data={Data}
                isScrolling={isScrolling}
              ></RecomSectionCard>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
SugSlider.propTypes = {
  FeatchedRecom: PropTypes.array,
};
