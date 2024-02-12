import React from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css'; // Import CSS file for styling

const Home = () => {
  const { state } = useLocation();
  const handleLogout = () => {
    // ทำการลบข้อมูลผู้ใช้จาก state หรือทำอื่นๆ ตามต้องการ
    // และนำทางไปยังหน้า login หรือหน้าที่คุณต้องการ
    window.location.href = '/'; // นำทางไปยังหน้า login
  };

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h2 className="welcome-message">Welcome to Home Page</h2>
        {state ? (
          <div className="user-info">
            <p>Username: {state.username}</p>
            <p>Password: {state.password}</p>
            <p>FirstName: {state.firstName}</p>
            <p>LastName: {state.lastName}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <button onClick={handleLogout} className="logout-button">Logout</button> {/* เลื่อนปุ่มล็อกเอ้าไว้ที่นี่ */}
      </div>
    </div>
  );
};

export default Home;
