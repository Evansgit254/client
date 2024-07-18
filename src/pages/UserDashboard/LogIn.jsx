// src/pages/LogIn.jsx
import React from 'react';

const LogIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">Email<span className="text-red-500">*</span></label>
            <input className="w-full px-3 py-2 border rounded-lg" id="email" type="email" placeholder="Email" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="password">Password<span className="text-red-500">*</span></label>
            <input className="w-full px-3 py-2 border rounded-lg" id="password" type="password" placeholder="Password" />
          </div>
          <button className="w-full bg-purple-700 text-white py-2 px-4 rounded-lg">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
