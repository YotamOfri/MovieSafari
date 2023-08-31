const GetInfoFromDetails = (details) => {
  if (details) {
    let main = details.number_of_seasons
      ? `S${details.number_of_seasons}`
      : details.release_date;
    let second = details.runtime
      ? `${details.runtime} min`
      : `E${details.number_of_episodes}`;
    return main ? [main.slice(0, 4), second] : [];
  }
};

export default GetInfoFromDetails;
