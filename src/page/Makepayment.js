import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Makepayment.css';

const Makepayment = () => {
  const [product, setProduct] = useState(null);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const user = {}; // Replace with actual user data
  const [isFileUploaded, setFileUploaded] = useState(false); 
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);
      // TODO: Upload the file to a server or handle it in some other way
      setFileUploaded(true);
    } else {
      alert('โปรดใส่สลิป');
    }
  }
  

  function handleButtonClick() {
    if (!isFileUploaded) {
      alert('โปรดใส่สลิป');
    } else {
      // TODO: Send the data to the server
      console.log('Sending data to the server...');
      alert('รอการตรวจสอบชำระเงิน');
      navigate('/Home');
    }
  }

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  useEffect(() => {
    const storedProduct = localStorage.getItem('product');
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
    const closeNavOnOutsideClick = (event) => {
      if (isNavVisible) {
        const header = document.querySelector('.red-header');
        if (header && !header.contains(event.target)) {
          setIsNavVisible(false); // Corrected here
        }
      }
    };
    document.addEventListener('click', closeNavOnOutsideClick);
  
    return () => {
      document.removeEventListener('click', closeNavOnOutsideClick);
    };
  }, [isNavVisible]);

  // ...

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
      <div className="parent-container-Makepayment">
      <div className="container-Makepayment">
      <img src="https://cdn.discordapp.com/attachments/1062376070390743123/1211232523858878465/logo-big.png?ex=65ed7331&is=65dafe31&hm=21a0b48685a35de122b9cbf70286a6697d27ee5ad203f97fb23b59c20fd1f357&" alt="Descriptive text" className="center-image-Makepayment" />
      <br></br>
      <div className="description-Makepayment">
      <h1>{product && product.name}</h1>
      <p>{product && product.description}</p>
      <p>{product && product.description2}</p>
      <p>{product && product.description3}</p>
      <p>{product && product.description4}</p>
      <p>{product && product.description5}</p>
      <p>{product && product.description6}</p>
      <p>{product && product.description7}</p>
      <p>{product && product.description8}</p>
      <p>{product && product.description9}</p>
      <p>{product && product.description10}</p>
      <h1 className="center-text-red-Makepayment">฿{product && product.price}</h1>
      </div>
      <div className="description-Makepayment-ChooseFile">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button type="button" className="button-left" onClick={handleButtonClick}>ยืนยันคำสั่งซื้อ</button>
    </div>
      </div>
      </div>
    </div>
  );
}

export default Makepayment;
