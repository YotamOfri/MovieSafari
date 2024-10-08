import axios from "axios";

export default async function userInfo() {
  try {
    const response = await axios.get("http://localhost:3000/users/find", {
      headers: { tokencheck: "true" },
      withCredentials: true,
    });
    console.log(response.data.failed, "response.data");
    if (response.data.failed) return false;
    return response.data;
  } catch (error) {
    return false;
  }
}
