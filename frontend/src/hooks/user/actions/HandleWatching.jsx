import axios from "axios";

// Function now expects a single argument
export default async function HandleWatching({
  item,
  type,
  action,
  season,
  episode,
}) {
  console.log(JSON.stringify({ item, type, action }));
  try {
    const response = await axios.post(
      "http://localhost:3000/users/watching",
      JSON.stringify({ item, type, action, season, episode }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("An error occurred during adding to bookmark:", error);
    throw error;
  }
}
