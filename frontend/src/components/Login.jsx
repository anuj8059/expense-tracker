import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from "react";
import axios from "axios";
import { useAuth } from '../context/AuthContext';

function Login() {
  
    const navigate = useNavigate();
    const { setIsAuth, setUser } = useAuth();

    const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.username.trim() === "" || formData.password.trim() === "") {
        toast.error("Please fill in all fields");
      return;

    }
    try {    

    const res = await axios.post("/api/login/", {
        username: formData.username,
        password: formData.password,
      })
    setIsAuth(true);
    setUser(res.data.username);
    toast.success(res.data.message);
    
    setTimeout(() => {
    navigate('/dashboard');
    }, 2000);

} catch (error) {
  if (error.response) {
    // Backend responded (400, 401, 404, etc.)
    console.log(error.response.data)
    alert(error.response.data.error)
  } else if (error.request) {
    // Request sent, no response
    alert("Server not responding")
  } else {
    // Something else happened
    alert(error.message)
  }
    
  };
    }
  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
        Login to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
          value={formData.username}
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <input
          value={formData.password}
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Create Account?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer" onClick={()=>navigate('/signup')}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  
    
  )
}

export default Login