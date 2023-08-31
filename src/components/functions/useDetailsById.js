import { useQuery } from "@tanstack/react-query";
import fetchDetailsById from "../Hooks/fetchDetailsById";
const useDetailsById = (idMediaPairs, key) => {
  const queryKeys = idMediaPairs.map(([id, mediaType]) => [key, id, mediaType]);

  return useQuery(queryKeys, () =>
    Promise.all(
      idMediaPairs.map(([id, mediaType]) => fetchDetailsById(id, mediaType))
    )
  );
};

export default useDetailsById;
