import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { state } = useLocation(); // รับข้อมูลผู้ใช้จาก location state

  return (
    <div>
      <h2>Welcome to Home Page</h2>
      {state ? (
        <div>
          <p>Username: {state.username}</p>
          <p>Password: {state.password}</p>
          <p>First Name: {state.firstName}</p>
          <p>Last Name: {state.lastName}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Home;
