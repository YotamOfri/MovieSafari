import Slider from "react-slick";
import PropTypes from "prop-types";
import toPascalCase from "../../utils/toPascalCase";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderCard from "./SliderCard";
export default function MainSlider({ data, TypeLink }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: TypeLink === "info" ? 9 : 3,
    slidesToScroll: TypeLink === "info" ? 9 : 3,
    initialSlide: 0,
    afterChange: () => setIsScrolling(false),
    beforeChange: () => setIsScrolling(true),
    responsive: [
      {
        breakpoint: 2500,
        settings: {
          slidesToShow: TypeLink === "ep" ? 3 : 7,
          slidesToScroll: TypeLink === "ep" ? 3 : 7,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: TypeLink === "ep" ? 3 : 5,
          slidesToScroll: TypeLink === "ep" ? 3 : 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: TypeLink === "ep" ? 2 : 3,
          initialSlide: TypeLink === "ep" ? 2 : 3,
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
    <div className="pt-10 px-6">
      <h2 className="pb-2 text-2xl font-bold relative">
        {TypeLink === "info" && (
          <span className="text-white rounded-md z-10">
            Trending {toPascalCase(data[0].media_type)}s
          </span>
        )}
      </h2>
      <Slider {...settings}>
        {data.map((item) => (
          <div key={item.id} className={`z-10 flex gap-5 px-1 cursor-pointer`}>
            <SliderCard
              Data={item}
              isScrolling={isScrolling}
              TypeLink={TypeLink}
            ></SliderCard>
            {TypeLink === "ep" && <h1>Episode {item.episode_number}</h1>}
          </div>
        ))}
      </Slider>
    </div>
  );
}
MainSlider.propTypes = {
  data: PropTypes.array.isRequired,
  TypeLink: PropTypes.string,
};
