import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/api/tasks', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Welcome, {user ? user.username : ''}</h1>
      <button onClick={logout} className="bg-red-500 text-white p-2 rounded">Logout</button>
      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
};

export default Dashboard;
