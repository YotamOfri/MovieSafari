import PropTypes from "prop-types";
import { useState } from "react";

export default function Login({ setIsAuthorized }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsAuthorized(query);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit} // Call handleSubmit when the form is submitted
        className="w-full sm:w-80 border border-gray-700 rounded-xl p-8 space-y-6 bg-gray-800 text-white"
      >
        <h1 className="text-3xl font-semibold text-center">Enter Password</h1>
        <input
          type="password"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Password"
        />
        <button
          type="submit" // This button submits the form
          className="w-full px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  setIsAuthorized: PropTypes.func,
};
