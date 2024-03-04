// Login.js
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
      const response = await fetch('http://localhost:3000/users');
      if (response.ok) {
        const users = await response.json();
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
          console.log(user);
          alert('เข้าสู่ระบบสำเร็จ');
  
          // Store user data in localStorage
          localStorage.setItem('user', JSON.stringify(user));
  
          // ทำการล็อคอินเสร็จแล้วไปที่หน้า Home และส่งข้อมูลผู้ใช้ไปที่หน้า Account
          navigate('/Home', { state: { user } });
        } else {
          alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
      } else {
        const errorMessage = await response.json();
        alert(errorMessage.message);
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ:', error);
    }
  };

  return (
    <div>
      <header className={`red-header : ''}`}>
        <div className="spacer"></div>
        <h1>
          <img src="https://cdn.discordapp.com/attachments/1062376070390743123/1210612505286811648/LogoGXUSHOP1.png?ex=65eb31c1&is=65d8bcc1&hm=796439ea811f58cc4ee6874946fc7642359a7c61c5374adc42af609c2bb0be0c&" alt="Descriptive text" className="logo-image" />
        </h1>
      </header>
    <div className="login-container">
      <h2>เข้าสู่ระบบ</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input
            type="text"
            placeholder="ชื่อผู้ใช้"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <Link to="/register" className="register-link">ลงทะเบียน</Link>
        <button type="submit" className="login-button">เข้าสู่ระบบ</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
