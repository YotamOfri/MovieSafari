import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import HeroSection from "../../../components/HeroSection/HeroSection";
import InformationMain from "./InformationMain";
export default function Information({ type }) {
  const { id } = useParams();
  return (
    <div className=" text-white">
      <HeroSection
        id={parseInt(id)}
        type={type}
        Code={`InformationPage +${id}`}
      ></HeroSection>
      <InformationMain type={type}></InformationMain>
    </div>
  );
}
Information.propTypes = {
  type: PropTypes.string.isRequired,
};
