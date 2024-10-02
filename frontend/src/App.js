import React from 'react';
import { AuthProvider } from './context/AuthContext'; // Adjust the path as necessary
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Your Navbar component
import Tasks from './pages/Tasks'; // Your Tasks component
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
// import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* <ToastContainer /> */}
        <Navbar />
        <Tasks />

        <Routes path="/" element={<Dashboard />} />
        <Routes path="/login" element={<Login />} />
        <Routes path="/register" element={<Register />} />
        <Routes path="/tasks" element={<Tasks />} />

      </Router>
    </AuthProvider>
  );
};

export default App;
