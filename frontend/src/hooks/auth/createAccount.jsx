import axios from "axios";
export default async function createAccount(newAccount) {
  try {
    const response = await axios.post(
      "http://localhost:3000/users/newuser",
      newAccount,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
}
