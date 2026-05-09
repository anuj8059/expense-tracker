import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const ExpenseReport = () => {
    const [expenses, setExpenses] = useState([])
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const fetchExpenses = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/expense/report/?from_date=${fromDate}&to_date=${toDate}`);
            setExpenses(response.data.expenses);
            toast.success("Report generated successfully!");
        } catch (error) {
            console.error("There was an error generating the report!", error);
            toast.error("Failed to generate report.");
        }
    };
    function totalAmount() {
        return expenses ? expenses.reduce(
            (sum, expense) => sum + Number(expense.expenseAmount),
            0
        ) : 0;
    }
    return (
        <div>

            <div className="min-h-screen bg-gray-100 p-6">
                <h2 className="text-2xl font-bold mb-4">Expense Report</h2>
                <div className="max-w-7xl mx-auto shadow-lg p-6 mb-6 bg-white rounded-xl">
                    <form onSubmit={fetchExpenses} className=' mb-5 flex justify-center gap-4'>
                        From <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className=' border border-gray-400 cursor-pointer p-4'/>
                        To <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className=' border border-gray-400 cursor-pointer p-4'/>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Generate Report
                        </button>
                    </form>
                </div>
                <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">

                    <h1 className="text-3xl font-bold mb-4">My Expenses</h1>

                    {/* Total */}
                    <div className="mb-6 text-lg font-semibold">
                        Total Expense:
                        <span className="text-blue-600 ml-2">₹{totalAmount()}</span>
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
                                        <th className="p-3">Item</th>
                                        <th className="p-3">Amount</th>
                                        <th className="p-3">Date</th>
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
                                            <td className="p-3"> {new Date(expense.date).toLocaleDateString("en-GB")}</td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div></div>
        </div>
    )
}

export default ExpenseReport