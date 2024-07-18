// src/pages/LogIn.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/contextApi";
import { FaTimes } from "react-icons/fa";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "root") {
      login();
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };
  const closeError = () => {
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4 text-black">Log In</h2>
          <Link to="/signup">sign up</Link>
        </div>
        {error && (
          <div className="flex justify-between items-center p-5 py-2 bg-red-200 text-red-500 rounded-xl">
            <p>{error}</p>
            <div className="p-1  text-black rounded-xl ">
              <FaTimes onClick={closeError} />
            </div>
          </div>
        )}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 px-4 rounded-lg"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
