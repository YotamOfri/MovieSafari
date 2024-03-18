import ScaleLoader from "react-spinners/ScaleLoader";
export default function LoadingAnimation() {
  return (
    <ScaleLoader
      color={"white"}
      loading={true}
      size={15}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
