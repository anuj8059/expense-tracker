import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateExpenseModal = ({
  isOpen,
  onClose,
  expense,
  onUpdate
}) => {
  const [formData, setFormData] = useState({
    expenseItem: "",
    expenseAmount: "",
    expenseDate: ""
  });

  // Pre-fill form when expense changes
  useEffect(() => {
    if (expense) {
      setFormData({
        expenseItem: expense.expenseItem,
        expenseAmount: expense.expenseAmount,
        expenseDate: expense.expenseDate,
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        try {
        axios.put(`/expense/update/${expense.id}/`, {
            item: formData.expenseItem,
            amount: formData.expenseAmount,
            date: formData.expenseDate,
        })
     onUpdate(expense.id, formData);
        
        toast.success("Expense updated successfully!");
    
       
   } catch (error) {
        console.error("There was an error updating the expense!", error);   
        toast.error("Failed to update expense.");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Update Expense</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              Expense Item
            </label>
            <input
              type="text"
              name="expenseItem"
              value={formData.expenseItem}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Amount
            </label>
            <input
              type="number"
              name="expenseAmount"
              value={formData.expenseAmount}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Date
            </label>
            <input
              type="date"
              name="expenseDate"
              value={formData.expenseDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Update
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateExpenseModal;