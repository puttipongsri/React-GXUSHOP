import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import data from '../server/data.json';

import './Home.css';

function Home() {
  const user = localStorage.getItem('user');
  const [isNavVisible, setNavVisible] = useState(false);
  const [randomProducts, setRandomProducts] = useState({ setcom: [], setcommoniter: [], fullset: [] });



  const toggleNav = () => {
    setNavVisible(!isNavVisible);
  };

  useEffect(() => {
    setRandomProducts({
      setcom: getRandomProducts(data.setcom, 3),
      setcommoniter: getRandomProducts(data.setcommoniter, 3),
      fullset: getRandomProducts(data.fullset, 3),
    });
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
  }, [isNavVisible]);
  function getRandomProducts(array, n) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }
  function truncate(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
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
      <div className="product-display">
        {randomProducts.setcom.map((product, index) => (
          <div key={index} className="product-card">
            <Link to={`/productpage/${product.id}`}
              onClick={() => localStorage.setItem('product', JSON.stringify(product))}>
              <img src={product.image} alt={product.name} className="product-image-input" />
              <h3>{truncate(product.name, 35)}</h3>
            </Link>
            <p>{truncate(product.description, 50)},{truncate(product.description3, 50)}</p>
            <h2 className="price">฿{product.price}</h2>
          </div>
        ))}
        {randomProducts.setcommoniter.map((product, index) => (
          <div key={index} className="product-card">
            <Link to={`/productpage/${product.id}`}
              onClick={() => localStorage.setItem('product', JSON.stringify(product))}>
              <img src={product.image} alt={product.name} className="product-image-input" />
              <h3>{truncate(product.name, 35)}</h3>
            </Link>
            <p>{truncate(product.description, 50)},{truncate(product.description3, 50)}</p>
            <h2 className="price">฿{product.price}</h2>
          </div>
        ))}
        {randomProducts.fullset.map((product, index) => (
          <div key={index} className="product-card">
            <Link to={`/productpage/${product.id}`}
              onClick={() => localStorage.setItem('product', JSON.stringify(product))}>
              <img src={product.image} alt={product.name} className="product-image-input" />
              <h3>{truncate(product.name, 35)}</h3>
            </Link>
            <p>{truncate(product.description, 50)},{truncate(product.description3, 50)}</p>
            <h2 className="price">฿{product.price}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
