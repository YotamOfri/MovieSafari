import luffy from "../../../assets/Finle2.png";
import PropTypes from "prop-types";
import AniListImage from "../../../components/AnimeComps/ImageLoaders/AniListImage";
import { Link } from "react-router-dom";
export default function HeroSection({ data }) {
  console.log(data);
  return (
    <div className="relative w-full">
      <div className="h-[500px] font-roboto md:h-[55vh] md:min-h-[550px] relative flex items-end gap-20">
        <div className="absolute md:-bottom-[40%] -bottom-[60%] left-0 w-full h-96 bg-gradient-to-b from-transparent to-[#0c0f18] -z-[1]"></div>
        <div className="absolute top-0 md:h-[140%] h-[160%] w-full -z-10 ">
          <AniListImage
            src={luffy}
            imgclass="object-cover h-full w-full opacity-60 absolute -z-10"
            alt=""
            blurHash="LFB2.O9^56={|?J8I;w]E1t6o}I:"
          />
        </div>
        <div className="px-4 h-full pt-40 flex flex-col md:justify-between md:gap-0 gap-20 relative">
          <div className="flex flex-col gap-10 text-white">
            <div className="flex flex-col gap-5">
              <h1 className="text-5xl font-bold">One Piece</h1>
              <h3>Best Anime of all Time</h3>
            </div>
            <div className="flex flex-col gap-2">
              <div className="hidden md:block text-white max-w-[700px] max-h-[200px]">
                One Piece is an epic and timeless adventure that has captured
                the hearts of fans around the world. It&apos;s a sprawling tale
                of camaraderie, dreams, and the unbreakable bonds of friendship,
                set in a richly detailed world filled with diverse islands,
                cultures, and fantastical creatures.
              </div>
              <div className="flex gap-3 sm:pb-0 pb-3 sm:flex-row flex-col ">
                <div className="flex flex-wrap gap-2">
                  {data.genres.map((item) => {
                    return (
                      <div
                        key={item}
                        className="px-2 py-1 text-white bg-black rounded-md"
                      >
                        {item}
                      </div>
                    );
                  })}

                  <h1 className="flex items-center text-xs">
                    <span className="w-1 h-1 bg-white rounded-full mr-1"></span>
                    Episodes {data.episodes.length}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <Link
            to={"one-piece-episode-1"}
            className="w-40 bg-white block px-4 py-2 text-center border border-gray-300 rounded-md font-semibold text-gray-700 hover:bg-gray-100"
          >
            Watch Now
          </Link>
        </div>
      </div>
    </div>
  );
}

HeroSection.propTypes = {
  data: PropTypes.object.isRequired,
};
