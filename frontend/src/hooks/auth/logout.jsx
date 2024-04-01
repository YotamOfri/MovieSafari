import axios from "axios";
export default async function logout() {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("An error occurred during logout:");
    throw error;
  }
}
