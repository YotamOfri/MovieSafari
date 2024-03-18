import { useQuery } from "@tanstack/react-query";
import fetchByUrl from "../../../hooks/fetchByurl";
import { useParams } from "react-router-dom";
import ErrorComponent from "../../../components/Status/ErrorComponent";
import Recommendtions from "../../../utils/Recommendtions";
import MainSlider from "../../../components/Slider/MainSlider";
import LoadingAnimation from "../../../components/Status/LoadingAnimation";
import PropTypes from "prop-types";
export default function Suggestions({ type }) {
  const { id } = useParams();
  const { data: Recommendtion, status } = useQuery([`Suggestion +${id}`], () =>
    fetchByUrl(Recommendtions(type, id))
  );
  return (
    <div>
      {status === "success" && Recommendtion.results.length > 0 && (
        <MainSlider data={Recommendtion.results} TypeLink={"sugg"}></MainSlider>
      )}
      {status === "success" && Recommendtion.results.length === 0 && (
        <div>No Results</div>
      )}
      {status === "loading" && (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingAnimation></LoadingAnimation>
        </div>
      )}
      {status === "error" && (
        <div className="w-full h-full flex justify-center items-center pt-20">
          <ErrorComponent></ErrorComponent>
        </div>
      )}
    </div>
  );
}
Suggestions.propTypes = {
  type: PropTypes.string.isRequired,
};
