// src/pages/SignUp.jsx
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const defaultUser = {
  username: '',
  email: '',
  password: '',
  re_password: '',
  last_name: '',
  first_name: '',
}

const SignUp = () => {
  const [formData, setFormData] = useState(defaultUser);
  const navigate = useNavigate()
  const [errors, setErrors] = useState(defaultUser);


  const handleChange = (e) => {
    const { name, value } = e.target;
    // e.target.name === name
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(defaultUser)
    axios.post("http://127.0.0.1:8000/api/v1/auth/users/", formData).then((response) => {
      navigate("/login")
      setFormData(response.data.houses)
    }).catch((error)=>{
      if (error.response) {
        const allErrors = {}
        Object.entries(error.response.data).map((obj)=>{
          console.log(obj)
          allErrors[obj[0]] = obj[1][0]
        })
        setErrors({...defaultUser, ...allErrors})
      } else {
        console.log('Error', error.message);
      }
    });
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 my-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div>
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="firstname">Firstname<span className="text-red-500">*</span></label>
            <input 
              className={`w-full px-3 py-2 border rounded-lg  ${errors.first_name ? 'border-red-500' : ''}` }
              id="firstname" 
              type="text" 
              name="first_name" 
              placeholder="Firstname" 
              value={formData.name} 
              onChange={handleChange}
              required 
            />
          {errors.first_name && <p className="text-red-500 text-sm mt-2">{errors.first_name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="surname">Surname<span className="text-red-500">*</span></label>
            <input 
              className={`w-full px-3 py-2 border rounded-lg ${errors.last_name ? 'border-red-500' : ''}`}
              id="surname" 
              type="text" 
              name="last_name" 
              placeholder="Surname" 
              value={formData.name} 
              onChange={handleChange}
              required 
              />
              {errors.last_name && <p className="text-red-500 text-sm mt-2">{errors.last_name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="username">Username<span className="text-red-500">*</span></label>
            <input 
            className={`w-full px-3 py-2 border rounded-lg  ${errors.username ? 'border-red-500' : ''}`}
              id="username" 
              type="text" 
              name="username" 
              placeholder="Username" 
              value={formData.name} 
              onChange={handleChange}
              required 
            />
            {errors.username && <p className="text-red-500 text-sm mt-2">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">Email<span className="text-red-500">*</span></label>
            <input 
              className={`w-full px-3 py-2 border rounded-lg  ${errors.email ? 'border-red-500' : ''}`}
              id="email" 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="password">Password <span className="text-red-500">*</span></label>
            <input 
              className={`w-full px-3 py-2 border rounded-lg  ${errors.password ? 'border-red-500' : ''}`}
              id="password" 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password<span className="text-red-500">*</span></label>
            <input 
              className={`w-full px-3 py-2 border rounded-lg ${errors.re_password ? 'border-red-500' : ''}`} 
              id="confirmPassword" 
              type="password" 
              name="re_password" 
              placeholder="Confirm Password" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
              />
              {errors.re_password && <p className="text-red-500 text-sm mt-2">{errors.re_password}</p>}
          </div>
          <button onClick={handleSubmit} className="w-full bg-purple-700 text-white py-2 px-4 rounded-lg">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
