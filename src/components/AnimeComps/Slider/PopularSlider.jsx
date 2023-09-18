import Slider from "react-slick";
import PropTypes from "prop-types";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageLoaderAnimeLink from "../ImageLoaders/ImageLoaderAnimeLink";
export default function MainSlider({ data }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 9,
    slidesToScroll: 9,
    initialSlide: 0,
    afterChange: () => setIsScrolling(false),
    beforeChange: () => setIsScrolling(true),
    responsive: [
      {
        breakpoint: 2500,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    <div className="pt-10 md:w-[95%] sm:w-[90%] w-[85%] text-white">
      <h2 className="pb-2 text-2xl font-bold relative">Trending</h2>
      <Slider {...settings}>
        {data.map((item) => (
          <div
            key={item.id}
            className={` z-10 flex gap-5 px-1 cursor-pointer `}
          >
            <ImageLoaderAnimeLink
              path={`${item.id}`}
              isScrolling={isScrolling}
              src={item.image}
              className={
                "rounded-lg transition-all duration-300 ease-in-out hover:scale-100 scale-95  hover:shadow-lg hover:shadow-black"
              }
            ></ImageLoaderAnimeLink>
          </div>
        ))}
      </Slider>
    </div>
  );
}
MainSlider.propTypes = {
  data: PropTypes.array.isRequired,
};
