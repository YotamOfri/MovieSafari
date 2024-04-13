import PropTypes from "prop-types";
import { PlaySquareIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import fetchCollectionDetails from "@/hooks/Modern/fetchCollectionDetails";
import { Link } from "react-router-dom";
import ImageLoad from "@/components/imageLoad";
import Loading from "@/components/Animations/Loading";
export default function Collections({ collectionId, currentId }) {
  const { data, status } = useQuery(["MovieCollection", collectionId], () =>
    fetchCollectionDetails(collectionId)
  );
  if (status === "loading") {
    return <div></div>;
  }
  return (
    <div className="relative ">
      {status === "loading" && <div>Loading...</div>}
      {status === "success" && (
        <div className="lg:w-96 w-full lg:h-full overflow-y-scroll  z-10 h-40 py-4 flex flex-col gap-2">
          <h1 className="text-white flex justify-center items-center gap-2">
            <PlaySquareIcon className="text-white fill-transparent"></PlaySquareIcon>
            {data.name}
          </h1>
          <div className="flex flex-col gap-2 overflow-y-scroll">
            {data.parts.map((item, index) => (
              <Link to={`/movie/player/${item.id}`} key={index}>
                <div
                  className={`w-full z-20 relative overflow-hidden ${
                    currentId == item.id && "bg-blue-600 text-white"
                  } p-2 cursor-pointer`}
                >
                  <h1>{item.title}</h1>
                  <ImageLoad
                    className="absolute w-full top-0 opacity-20 overflow-hidden"
                    src={item.backdrop_path}
                  ></ImageLoad>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="absolute top-0 left-0 bg-gradient-to-t h-full w-full from-mainBg via-black to-black -z-10 rounded-md" />
    </div>
  );
}
Collections.propTypes = {
  collectionId: PropTypes.number,
  currentId: PropTypes.number,
};
