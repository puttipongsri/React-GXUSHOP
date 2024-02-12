import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/users');
      if (response.ok) {
        const users = await response.json();
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
          console.log(user);
          alert('Login successful');
          navigate('/home', { state: user});
        } else {
          alert('Incorrect username or password');
        }
      } else {
        const errorMessage = await response.json();
        alert(errorMessage.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <Link to="/register" className="register-link">Register</Link>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
