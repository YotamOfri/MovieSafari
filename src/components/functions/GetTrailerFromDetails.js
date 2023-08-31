const GetTrailerFromDetails = (details) => {
  const trailer = details.videos.results.find(
    (vid) => vid.name === "Official Trailer"
  );
  return trailer
    ? trailer.key
    : details.videos.results.length > 0
    ? details.videos.results[details.videos.results.length - 1].key
    : "";
};

export default GetTrailerFromDetails;
