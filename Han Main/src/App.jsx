import axios from "axios"
import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Login from "./page/Login.jsx"
import Signup from "./page/Signup.jsx"
import Home from "./page/Home.jsx"
import Navbar from "./component/Navbar.jsx"
import AdminDashboard from "./page/Admin/AdminDashboard.jsx"
import TrainerDashboard from "./page/Trainer/TrainerDashboard.jsx"
import AdminProtectedRoute from "./protected/AdminProtectedRoute.jsx"
import TrainerProtectedRoute from "./protected/TrainerProtectedRoute.jsx"
import CustomerDashboard from "./page/Customer/CustomerDashboard.jsx"

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}


function App() {
  return (

    <Routes>

      <Route path="/" element={<Layout><Home /></Layout>} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />


      {/* Customer pages */}
      <Route path="/dashboard" element={
        <Layout>
          <CustomerDashboard />
        </Layout>
      }></Route>


      {/* Admin pages */}
      <Route path="/admin" element=
        {
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />


      {/* Trainer Pages */}
      <Route path="/trainer" element=
        {
          <TrainerProtectedRoute>
            <TrainerDashboard />
          </TrainerProtectedRoute>
        } />


    </Routes>
  )
}

export default App