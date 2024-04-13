import Slider from "react-slick";
import PropTypes from "prop-types";
import toPascalCase from "../../utils/toPascalCase";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderCard from "./SliderCard";
import { Link } from "react-router-dom";
const CustomPrevArrow = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className="custom-prev-arrow absolute top-[42.5%] -left-12 hover:scale-[1.05] duration-300 ease-in-out text-gray-600 hover:text-white"
  >
    <IoIosArrowBack size={60} />
  </button>
);
const CustomNextArrow = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className="custom-next-arrow absolute top-[42.5%] -right-12 hover:scale-[1.05] duration-300 ease-in-out text-gray-600 hover:text-white"
  >
    <IoIosArrowForward size={60} />
  </button>
);
export default function MainSlider({ data, TypeLink }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHover, setIsHover] = useState(false);
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
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="sm:pt-10 pt-20 px-8">
      <Link
        className="group pb-2 pt-6 text-2xl font-bold relative flex items-center w-fit cursor-pointer gap-2"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {TypeLink === "info" && (
          <p className="text-white rounded-md z-10">
            Trending {toPascalCase(data[0].media_type)}s
          </p>
        )}
        <AnimatePresence key={"slider"}>
          {isHover && (
            <div className="flex relative h-8 text-gray-400/80">
              <motion.div
                className="absolute w-fit text-xs top-1/3 left-0 "
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.3, delay: 0.2 },
                }}
                exit={{ opacity: 0 }}
              >
                Explore
              </motion.div>
              <motion.div
                className="absolute top-[12.5%]"
                initial={{ x: "auto", opacity: 0.2 }}
                animate={{
                  x: 40,
                  opacity: 1,
                  transition: { type: "spring", duration: 0.5 },
                }}
                exit={{ x: 0, opacity: 0 }}
              >
                <i className="bx bx-chevron-right"></i>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Link>
      <Slider {...settings} className="custom-slider">
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
CustomPrevArrow.propTypes = {
  currentSlide: PropTypes.any,
  slideCount: PropTypes.any,
};

CustomNextArrow.propTypes = {
  currentSlide: PropTypes.any,
  slideCount: PropTypes.any,
};
