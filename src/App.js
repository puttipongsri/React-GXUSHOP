// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login/login';
import Register from './login/Register';
import Account from './page/account';
import Home from './page/Home';
import Setcom from './page/setcom';
import Setcommoniter from './page/setcommoniter';
import Fullset from './page/Fullset';
import ProductPage from './page/ProductPage';
import Makepayment from './page/Makepayment';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Setcom" element={<Setcom />} />
        <Route path="/Setcommoniter" element={<Setcommoniter />} />
        <Route path="/Fullset" element={<Fullset />} />
        <Route path="/productpage/:id" element={<ProductPage />} />
        <Route path="/makepayment" element={<Makepayment />} />


      </Routes>
    </Router>
  );
};

export default App;
