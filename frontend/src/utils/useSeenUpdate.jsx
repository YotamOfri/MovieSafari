import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query"; // Import useQuery from your library
import HandleWatching from "../hooks/user/actions/HandleWatching";
function useSeenUpdate(timeInMinutes, type, id, update, informationObject) {
  const [timerCompleted, setTimerCompleted] = useState(false);
  const timeInMillis = timeInMinutes * 60 * 1000; // Convert minutes to milliseconds
  console.log("useSeenUpdate", {
    timeInMinutes,
    type,
    id,
    update,
    informationObject,
  });
  useEffect(() => {
    if (!timeInMinutes) return;
    const timer = setTimeout(() => {
      setTimerCompleted(true);
    }, timeInMillis);

    return () => clearTimeout(timer);
  }, [timeInMillis, timeInMinutes]);

  const { data, status } = useQuery({
    queryKey: ["addSeen", id, type, update],
    queryFn: HandleWatching({
      item: id,
      season: informationObject.season,
      episode: informationObject.episode,
      type,
      action: update,
    }),
    refetchOnWindowFocus: false,
    enabled: timeInMinutes,
  });

  return { data, status };
}

export default useSeenUpdate;
