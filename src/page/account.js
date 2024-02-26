import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './account.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';



const Account = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isNavVisible, setNavVisible] = useState(false);

  const toggleNav = () => {
    setNavVisible(!isNavVisible);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If no user data in localStorage, redirect to login page
      navigate('/login');
    }
  
    const closeNavOnOutsideClick = (event) => {
      if (isNavVisible) {
        // ตรวจสอบว่าคลิกที่นอก Navbar หรือไม่
        const header = document.querySelector('.red-header');
        if (header && !header.contains(event.target)) {
          setNavVisible(false);
        }
      }
    };
  
    // เพิ่ม Event Listener สำหรับคลิกที่ส่วนอื่นของหน้าเว็บ
    document.addEventListener('click', closeNavOnOutsideClick);
  
    // ทำคลีนอื่นๆเมื่อ Component ถูก Unmount
    return () => {
      document.removeEventListener('click', closeNavOnOutsideClick);
    };
  }, [isNavVisible, navigate]);

  const handleLogout = () => {
    // Remove user data from localStorage and redirect to login page
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div>
      <header className={`red-header ${isNavVisible ? 'nav-open' : ''}`}>
        <div className="hamburger" onClick={toggleNav}>
          <span className="hamburger-icon">☰</span>
        </div>
        <div className="spacer"></div>
        <h1>
          <img src="https://cdn.discordapp.com/attachments/1062376070390743123/1210612505286811648/LogoGXUSHOP1.png?ex=65eb31c1&is=65d8bcc1&hm=796439ea811f58cc4ee6874946fc7642359a7c61c5374adc42af609c2bb0be0c&" alt="Descriptive text" className="logo-image" />
        </h1>
        <div className="header-icons">
          <div className="spacer"></div>
          <Link to="/account" state={{ user }}>
            <FontAwesomeIcon icon={faUser} className="fa-icon" />
          </Link>
        </div>
      </header>
      <nav className={`navbar ${isNavVisible ? 'nav-open' : 'nav-close'}`}>
        <ul>
        <span className="hamburger-icon">☰</span>
        <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/setcom">Setcom</Link>
          </li>
          <li>
            <Link to="/setcommoniter">Setcommoniter</Link>
          </li>
          <li>
            <Link to="/fullset">Fullset</Link>
          </li>
          <p className="color-text">sri.puttipong@gmail.com</p>
          <p className="color-text">Facebook : Bank Puttipong</p>
          <p className="color-text">Instagram : bankk.p</p>
        </ul>
      </nav>
    <div className="account-container">
      <div className="welcome-section">
        <h2 className="welcome-message">Account</h2>
        {user ? (
          <div className="user-info">
            <p>Username: {user && user.username}</p>
            <p>Password: {user && "*".repeat(user.password.length)}</p>
            <p>FirstName: {user && user.firstName}</p>
            <p>LastName: {user && user.lastName}</p>
            <p>Address: {user && user.address}</p>
            <p>PhoneNumber: {user && user.phonenumber}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
    </div>
  );
};

export default Account;