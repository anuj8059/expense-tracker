import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateExpenseModal from "./UpdateExpencePopup";
import { toast } from "react-toastify";

const Expenses = ({ isAuthenticated }) => {
    const navigate = useNavigate();
  const [expenses, setExpenses] = useState([ ]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
 

 async function handleDeleteExpense(expenseId) {  
    try {
      await axios.delete(`/expense/delete/${expenseId}/`);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== expenseId)
      );
      toast.success("Expense deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the expense!", error);
      toast.error("Failed to delete expense.");
    }
  }

 function onUpdate(expenseId, updatedData) {  
    setExpenses(prevExpenses =>
      prevExpenses.map(expense =>
        expense.id === expenseId ? { ...expense, ...updatedData } : expense
      )
    );
  }

 const expenseUpdateModel = (expense) => {
    setEditingExpense(expense);
    setIsOpen(true);
  };

  const onClose = () => {
    setEditingExpense(null);
    setIsOpen(false);
  };

  const totalAmount = () => expenses?expenses.reduce(  
    (sum, expense) => sum + Number(expense.expenseAmount),
    0
  ): 0;

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("/expense/list/");
      console.log('response.data:', response.data);
      
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error("There was an error fetching the expenses!", error);

    }
  };

  useEffect( () => {

  fetchExpenses();
  console.log('called');
  

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
        
        <h1 className="text-3xl font-bold mb-4">My Expenses</h1>

        {/* Total */}
        <div className="mb-6 text-lg font-semibold">
          Total Expense:
          <span className="text-blue-600 ml-2">₹{Math.floor(totalAmount())}</span>
        </div>

        {/* Empty State */}
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center">
            No expenses added yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">Title</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">{expense.expenseItem}</td>
                    <td className="p-3">₹{expense.expenseAmount}</td>
                    <td className="p-3">{expense.expenseDate}</td>

                    <td className="p-3 flex justify-center gap-2">
                      <button onClick={() => expenseUpdateModel(expense)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
 <UpdateExpenseModal isOpen={isOpen} onClose={onClose} expense={editingExpense} onUpdate={onUpdate} />
    </div>
  );
};

export default Expenses;