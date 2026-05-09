import React from "react";
import { Link } from "react-router-dom";

const Home = ({ isAuthenticated }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">
        Anuj's
      </h1>
      <h1 className="text-4xl font-bold mb-6">
        Expense Tracker
      </h1>

      <p className="text-gray-600 mb-8">
        Track your expenses smartly and easily
      </p>

      {/* Conditional Rendering */}
      {isAuthenticated ? (
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      ) : (
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;