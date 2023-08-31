import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import fetchTrendingAll from "../../Hooks/fetchTrendingAll";

import { CardSlider } from "./CardSlider";
export function DisplayByApi({ URL }) {
  const { data: FeatchedData } = useQuery([`${URL}`], () =>
    fetchTrendingAll(URL)
  );
  return (
    <div className="sm:mt-10 px-7 overflow-hidden">
      {FeatchedData && FeatchedData.length > 0 && (
        <CardSlider FeatchedData={FeatchedData}></CardSlider>
      )}
    </div>
  );
}
DisplayByApi.propTypes = {
  URL: PropTypes.string,
};
