import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
// import { toast } from 'react-toastify';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import AuthContext from '../context/AuthContext';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data);
    } catch (err) {
      // toast.error('Failed to load tasks');
    }
  };

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  return (
    <div className="tasks-container">
      <h2>Your Tasks</h2>
      <TaskForm onTaskCreated={fetchTasks} />
      <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
    </div>
  );
};

export default Tasks;
