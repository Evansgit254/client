import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/contextApi";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();
  const [body, setBody] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    msg: "",
    status: "",
  });
  const changeBody = (e) => {
    // console.log(e.target.value, e.target.name)
    const newBody = { ...body, [e.target.name]: e.target.value };
    setBody(newBody);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // request the backend for login
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/auth/jwt/create/",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const results = await response.json();
      setAuthToken(results);
      setError({
        msg: "You are successfully loggedin. Redirecting...",
        status: "success",
      });
      navigate("/dashboard");
    } catch (error) {
      const msg = error?.message || "Error Occurred";
      setError({ msg, status: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <form
          className="flex flex-col space-y-5"
          onSubmit={(e) => handleSubmit(e)}
        >
          {error.msg ? (
            <div
              className={`${
                error.status === "success"
                  ? "bg-green-100 text-green-500"
                  : "bg-red-100 text-red-500"
              } px-2 py-1 rounded-lg`}
            >
              <p>{error.msg}</p>
            </div>
          ) : (
            <></>
          )}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => changeBody(e)}
              name="email"
              value={body.email}
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
              onChange={(e) => changeBody(e)}
              name="password"
              value={body.password}
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