import axios from "axios";
export default async function refresh() {
  try {
    const response = await axios.get("http://localhost:3000/auth/refresh", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
}
