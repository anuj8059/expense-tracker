import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log(formData);
    
    try {    

    const res = await axios.post("/api/signup/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
        console.log(res.data);
        toast.success(res.data.message);
        navigate('/')




} catch (error) {
     console.error("There was an error!", error.response);
    toast.error(error.response.data.error || "Signup failed");
}
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign up to get started
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
          value={formData.email}
            type="email"
            name="email"
            placeholder="Email Address"
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

          <input
            value={formData.confirmPassword}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer" onClick={()=>navigate('/login')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;