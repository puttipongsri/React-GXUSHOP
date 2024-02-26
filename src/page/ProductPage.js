import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './ProductPage.css';


function ProductPage() {
  const [product, setProduct] = useState({});
  const [isNavVisible, setNavVisible] = useState(false);
  const location = useLocation();
  const user = location.state;
  const handleOrder = (product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
  }


  const toggleNav = () => {
    setNavVisible(!isNavVisible);
  };

  useEffect(() => {
    const storedProduct = localStorage.getItem('product');
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
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
  }, [isNavVisible]);

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
      <br /><br /><br /><br />
      <div className="product-header" style={{ display: 'flex', alignItems: 'center' }}>
  <img src={product.image} alt={product.name} className="product-image-productpage margin-left" />
  <div style={{ marginLeft: '20px' }}>
    <h1 className="product-name-productpage margin-left-name">{product.name}</h1>
    <hr style={{ width: 'auto', margin: '0 auto' }} />
    <p className="product-name-productpage margin-left-name product-description-productpage">{product.description}</p>
<p className="product-name-productpage margin-left-name product-description-productpage">{product.description2}</p>
<p className="product-name-productpage margin-left-name product-description-productpage">{product.description3}</p>
<p className="product-name-productpage margin-left-name product-description-productpage">{product.description4}</p>
<p className="product-name-productpage margin-left-name product-description-productpage">{product.description5}</p>
<p className="product-name-productpage margin-left-name product-description-productpage">{product.description6}</p>
<p className="product-name-productpage margin-left-name product-description-productpage">{product.description7}</p>
<p className="product-name-productpage margin-left-name product-description-productpage">{product.description8}</p>
<p className="product-name-productpage margin-left-name product-description-productpage">{product.description9}</p>
<p className="product-name-productpage margin-left-name product-description-productpage">{product.description10}</p>
<hr style={{ width: 'auto', margin: '0 auto' }} />
<h1 className="product-price product-name-productpage margin-left-name" style={{ color: 'red' }}>${product.price}</h1>
<button className="green-button" onClick={() => handleOrder(product)}>
  <Link to="/makepayment" style={{ color: 'white', textDecoration: 'none' }}>สั่งซื้อ</Link>
</button>
  </div>
</div>
    </div>
  );
}

export default ProductPage;