import { EpisodeSlider } from "./Slider/EpisodeSlider";
import PropTypes from "prop-types";
export function DisplayEpisodes({ FeatchedEpisodes }) {
  return (
    <div className="px-6">
      <EpisodeSlider
        FeatchedEpisodes={FeatchedEpisodes.episodes}
      ></EpisodeSlider>
    </div>
  );
}
DisplayEpisodes.propTypes = {
  FeatchedEpisodes: PropTypes.object,
};
