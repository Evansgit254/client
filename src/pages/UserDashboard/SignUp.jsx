// src/pages/SignUp.jsx
import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    confirmPassword: ''
  });

  const validatePasswordMatch = () => {
    return formData.password === formData.confirmPassword;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'confirmPassword' || name === 'password') {
      if (!validatePasswordMatch()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: 'Passwords do not match'
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: ''
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.confirmPassword) {
      alert('Please correct the errors in the form');
    } else {
      // Submit the form
      console.log('Form submitted', formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">Name<span className="text-red-500">*</span></label>
            <input 
              className="w-full px-3 py-2 border rounded-lg" 
              id="name" 
              type="text" 
              name="name" 
              placeholder="Name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">Email<span className="text-red-500">*</span></label>
            <input 
              className="w-full px-3 py-2 border rounded-lg" 
              id="email" 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="password">Password <span className="text-red-500">*</span></label>
            <input 
              className="w-full px-3 py-2 border rounded-lg" 
              id="password" 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password<span className="text-red-500">*</span></label>
            <input 
              className={`w-full px-3 py-2 border rounded-lg ${errors.confirmPassword ? 'border-red-500' : ''}`} 
              id="confirmPassword" 
              type="password" 
              name="confirmPassword" 
              placeholder="Confirm Password" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>}
          </div>
          <button className="w-full bg-purple-700 text-white py-2 px-4 rounded-lg">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
