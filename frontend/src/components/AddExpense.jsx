import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddExpense = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  // simple auth check (adjust for your backend)

  const [formData, setFormData] = useState({
    item: "",
    amount: "",
    date: "",
  });

  // 🔐 redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [ isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here
    axios.post('/expense/add/', {
      item: formData.item,
      amount: formData.amount,
      date: formData.date,
    })
    .then((response) => {
      console.log("Expense added:", response.data);
      toast.success("Expense added successfully!");
    })
    .catch((error) => {
      console.error("There was an error adding the expense!", error);
      toast.error("Failed to add expense.");
    // }).finally(() => {
    //   // Reset form
    //   setFormData({
    //     item: "",
    //     amount: "",
    //     category: "",
    //     date: "",
    //   });
    });

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Expense
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          Date: <input
            type="date"
            name="date"
            placeholder="Expense Date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
            <input
            type="text"
            name="item"
            placeholder="Expense Item"
            value={formData.item}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;