import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen space-y-3 text-xl font-semibold text-black">
      <div className="flex flex-col items-center justify-center mx-auto w-max">
      <span className="text-3xl">404! </span>
      <p>Page not found</p>
      </div>
      <Link to="/" className="text-white bg-black px-3 text-base py-2 rounded-lg">Go Home</Link>
    </div>
  );
};

export default Error;
