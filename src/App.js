import React from 'react';
import { BrowserRouter, Route , Switch , Redirect, Routes } from 'react-router-dom';
import Login from './login'; // Import your Login component
import Home from './Home'; // Import your Home component
import Register from './Register';
import { Navigate } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/register" element={<Register />} />
  </Routes>
</BrowserRouter>


    
  );
};

export default App;
