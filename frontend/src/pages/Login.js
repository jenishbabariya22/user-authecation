import React, { useState, useContext } from 'react';
import API from '../services/api';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/users/login', { email, password });
      login(data.token);
      navigate('/tasks');
      // toast.success('Logged in successfully');
    } catch (err) {
      // toast.error('Failed to login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
