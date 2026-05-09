import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  FaPlusCircle,
  FaListAlt,
  FaChartBar,
  FaKey,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";

const NavItem = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center gap-1 hover:text-blue-400 transition"
  >
    {icon}
    {children}
  </Link>
);

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuth, user, loading, setIsAuth, setUser } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) return null;

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout/", {}, { withCredentials: true });
      setIsAuth(false);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Logout failed");
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-400">
          ExpenseTracker
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu */}
        {isAuth && (
          <div
            className={`${
              open ? "flex" : "hidden"
            } md:flex flex-col md:flex-row gap-4 md:gap-6 text-sm absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent px-6 md:px-0 py-4 md:py-0`}
          >
            <NavItem to="/dashboard" icon={<FaPlusCircle />}>
              Dashboard
            </NavItem>

            <NavItem to="/add-expense" icon={<FaPlusCircle />}>
              Add Expense
            </NavItem>

            <NavItem to="/expenses" icon={<FaListAlt />}>
              Manage Expense
            </NavItem>

            <NavItem to="/expense-report" icon={<FaChartBar />}>
              Expense Report
            </NavItem>

            <NavItem to="/change-password" icon={<FaKey />}>
              Change Password
            </NavItem>

            <span className="text-gray-400 hidden md:block">
              Hi, <span className="text-white">{user}</span>
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-400 hover:text-red-500 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}

        {!isAuth && (
          <div className="hidden md:flex gap-4">
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;