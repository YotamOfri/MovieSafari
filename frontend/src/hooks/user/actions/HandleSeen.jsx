import axios from "axios";

// Function now expects a single argument
export default async function HandleSeen({ item, type, action }) {
  console.log(JSON.stringify({ item, type, action }));
  try {
    const response = await axios.post(
      "http://localhost:3000/users/seen",
      JSON.stringify({ item, type, action }),
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
