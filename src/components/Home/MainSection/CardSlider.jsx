import Slider from "react-slick";
import PropTypes from "prop-types";
import { MainSectionCard } from "./MainSectionCard";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function toPascalCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}
export function CardSlider({ FeatchedData }) {
  const [isScrolling, setIsScrolling] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 9,
    slidesToScroll: 4,
    initialSlide: 0,
    beforeChange: () => setIsScrolling(true),
    afterChange: () => setIsScrolling(false),
    responsive: [
      {
        breakpoint: 2500,
        settings: {
          slidesToShow: 9,
          slidesToScroll: 7,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 4,
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
    <div className="pt-10">
      <h2 className="pb-2 text-2xl font-bold relative">
        <span className="  text-white rounded-md z-10">
          Trending {toPascalCase(FeatchedData[0].media_type)}s
        </span>
      </h2>
      <Slider {...settings}>
        {FeatchedData.map((Data) => (
          <div
            key={Data.id}
            className={`flex gap-5 px-1 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out`}
          >
            <MainSectionCard Data={Data} isScrolling={isScrolling} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

CardSlider.propTypes = {
  FeatchedData: PropTypes.array,
};
