import React, { useState } from 'react';
import API from '../services/api';
// import { toast } from 'react-toastify';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tasks', { title, description, priority, dueDate });
      // toast.success('Task created successfully');
      onTaskCreated();
      setTitle('');
      setDescription('');
      setPriority('');
      setDueDate('');
    } catch (err) {
      // toast.error('Failed to create task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
        <option value="">Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
