export default function FilterList(list) {
  const filteredResults = list.results.filter(
    (item) => item.media_type !== "person" && item.backdrop_path
  );
  return filteredResults;
}
