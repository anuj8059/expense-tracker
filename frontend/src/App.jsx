import { useState } from 'react'
import Signup from './components/Signup'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { useAuth } from './context/AuthContext'
import AddExpense from './components/AddExpense'
import ManageExpense from './components/ManageExpense'
import ExpenseReport from './components/ExpenseReport'
import ChangePassword from './components/ChangePassword'
import ExpenseDashboard from './components/Dashboard'



function App() {
  const [count, setCount] = useState(0)
  const { isAuth } = useAuth();

  return (
    <>
      <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home isAuthenticated={isAuth} />} />
        <Route path="/add-expense" element={<AddExpense isAuthenticated={isAuth} />} />
        <Route path="/expenses" element={<ManageExpense isAuthenticated={isAuth} />} />
        <Route path="/expense-report" element={<ExpenseReport isAuthenticated={isAuth} />} />
        <Route path="/change-password" element={<ChangePassword isAuthenticated={isAuth} />} />
        <Route path="/dashboard" element={<ExpenseDashboard isAuthenticated={isAuth} />} />

      </Routes>

    </>
  )}

export default App
