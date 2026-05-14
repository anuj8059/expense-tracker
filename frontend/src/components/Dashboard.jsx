import { useEffect } from "react";
import { toast } from "react-toastify";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function ExpenseDashboard() {

  const [expenses, setExpenses] = useState([]);
  const [todayExpenses, setTodayExpenses] = useState([]);
  const [yesterdayExpenses, setYesterdayExpenses] = useState([]);
  const [lastWeekExpenses, setLastWeekExpenses] = useState([]);
  const [lastMonthExpenses, setLastMonthExpenses] = useState([]);
  const [fullYearExpenses, setFullYearExpenses] = useState([]);
  const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A855F7",
];


  function handleExpenseDetailByDate(data) {

    console.log('data:', data);
    const today = new Date().toLocaleDateString("en-CA");
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("en-CA");
    const lastWeek = new Date(Date.now() - 604800000).toLocaleDateString("en-CA");
    const lastMonth = new Date(Date.now() - 2592000000).toLocaleDateString("en-CA");
    const fullYear = new Date(Date.now() - 31536000000).toLocaleDateString("en-CA");
    console.log('today:', typeof(today), 'yesterday:', yesterday, 'lastWeek:', lastWeek, 'lastMonth:', lastMonth, 'fullYear:', fullYear);

    let todayArr = [];
    let yesterdayArr = [];
    let lastWeekArr = [];
    let lastMonthArr = [];
    let fullYearArr = [];

    data.forEach((expense) => {
      if (expense.expenseDate === today) {
        todayArr.push(expense);
      }
      if (expense.expenseDate === yesterday) {
        yesterdayArr.push(expense);
      }
      if (expense.expenseDate >= lastWeek) {
        lastWeekArr.push(expense);
      }
      if (expense.expenseDate >= lastMonth) {
        lastMonthArr.push(expense);
      }
      if (expense.expenseDate >= fullYear) {
        fullYearArr.push(expense);
      }
    });

    setTodayExpenses(todayArr);
    setYesterdayExpenses(yesterdayArr);
    setLastWeekExpenses(lastWeekArr);
    setLastMonthExpenses(lastMonthArr);
    setFullYearExpenses(fullYearArr);

  
    // expenses.map((expense)=>{
    //     if(expense.expenseDate==today){
    //         setSelectedDate({...selectedDate, today: [...selectedDate.today, expense]})
    //     }
    //     if(expense.expenseDate==yesterday){
    //         setSelectedDate({...selectedDate, yesterday: [...selectedDate.yesterday, expense]})
    //     }
    //     if(expense.expenseDate>=lastWeek){
    //         setSelectedDate({...selectedDate, lastWeek: [...selectedDate.lastWeek, expense]})
    //     }
    //     if(expense.expenseDate>=lastMonth){
    //         setSelectedDate({...selectedDate, lastMonth: [...selectedDate.lastMonth, expense]})
    //     }
    //     if(expense.expenseDate>=fullYear){
    //         setSelectedDate({...selectedDate, fullYear: [...selectedDate.fullYear, expense]})
    //     }
    // })
  }



  async function fetchExpenses() {
    try {
      const response = await axios.get("/expense/list/");
      console.log('response.data:', response.data);
      
      setExpenses(response.data.expenses);
      handleExpenseDetailByDate(response.data.expenses);
    } catch (error) {
      console.error("There was an error fetching the expenses!", error);
      console.log(error.response);
      
      toast.error("Failed to fetch expenses.");

    }
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Expense Dashboard</h1>
      <div className="flex flex-wrap gap-3 mb-6">
        <Link
          to="/add-expense"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Expense
        </Link>
        <Link
          to="/expenses"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Manage Expense
        </Link>
        <Link
          to="/expense-report"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Expense Report
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Today Expenses</p>
          <p className="text-2xl font-bold mt-2">₹{Math.floor(todayExpenses.map(e => e.expenseAmount).reduce((a, b) => a + b, 0) )}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Yesterday Expenses</p>
          <p className="text-xl font-semibold mt-2">
            {`₹${Math.floor(yesterdayExpenses.map(e => Number(e.expenseAmount)).reduce((a, b) => a + b, 0))}`}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Last Weak Expenses</p>
          <p className="text-xl font-semibold mt-2">
            {`₹${Math.floor(lastWeekExpenses.map(e => Number(e.expenseAmount)).reduce((a, b) => a + b, 0))}`}
          </p>
        </div>
             <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Last Month Expenses</p>
          <p className="text-2xl font-bold mt-2">₹{Math.floor(lastMonthExpenses.map(e => Number(e.expenseAmount)).reduce((a, b) => a + b, 0))}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Full Year Expenses</p>
          <p className="text-xl font-semibold mt-2">
            {`₹${Math.floor(fullYearExpenses.map(e =>Number(e.expenseAmount)).reduce((a, b) => a + b, 0))}`}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Total Expenses</p>
          <p className="text-xl font-semibold mt-2">
            {`₹${Math.floor(expenses.map(e => Number(e.expenseAmount)).reduce((a, b) => a + b, 0))}`}
          </p>
        </div>
      </div>

      {/* Chart + Table */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-99">
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
                            <div className="flex flex-wrap justify-center gap-8 mb-4">
  {expenses.map((item, index) => (
    <div key={index} className="flex items-center gap-2">
      <span
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: COLORS[index % COLORS.length] }}
      />
      <span className="text-sm text-gray-700">
        {item.expenseItem} 
      </span>
    </div>
  ))}
</div>
          <div className="h-64 ">

            <ResponsiveContainer width="100%" height="120%">
              <PieChart >
                <Pie
                  
                  data={expenses}
                  dataKey={(entry) => Number(entry.expenseAmount)}
                  nameKey="expenseItem"
                  outerRadius={100}
                  label
                >
         {expenses.map((_, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Expense List</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Category</th>
                <th className="py-2">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2">{e.expenseItem}</td>
                  <td className="py-2">{e.expenseAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
