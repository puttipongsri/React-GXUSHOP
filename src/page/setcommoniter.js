import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './setcommoniter.css';


function Setcom() {
  const [isNavVisible, setNavVisible] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productDescription2, setProductDescription2] = useState('');
  const [productDescription3, setProductDescription3] = useState('');
  const [productDescription4, setProductDescription4] = useState('');
  const [productDescription5, setProductDescription5] = useState('');
  const [productDescription6, setProductDescription6] = useState('');
  const [productDescription7, setProductDescription7] = useState('');
  const [productDescription8, setProductDescription8] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [products, setProducts] = useState([]);
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const isAdmin = user && user.role === 'admin';


  const toggleNav = () => {
    setNavVisible(!isNavVisible);
  };

  const toggleAddProductModal = () => {
    // ถ้าเป็น admin ให้แสดง Modal
    if (isAdmin) {
      setShowAddProductModal(!showAddProductModal);
    }
  };

  const handleAddProduct = () => {
    fetch('http://localhost:3000/setcommoniter')
      .then((response) => response.json())
      .then((data) => {
        const highestId = data.reduce((maxId, product) => {
          const productIdNumber = Number(product.id.replace('M', ''));
          return productIdNumber > maxId ? productIdNumber : maxId;
        }, 0);

        const product = {
          id: `M${String(highestId + 1).padStart(2, '0')}`,
          name: productName,
          description: productDescription,
          description2: productDescription2,
          description3: productDescription3,
          description4: productDescription4,
          description5: productDescription5,
          description6: productDescription6,
          description7: productDescription7,
          description8: productDescription8,
          price: productPrice,
          image: productImage,
        };

        return fetch('http://localhost:3000/setcommoniter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // Clear the form fields
        setProductName('');
        setProductDescription('');
        setProductDescription2('');
        setProductDescription3('');
        setProductDescription4('');
        setProductDescription5('');
        setProductDescription6('');
        setProductDescription7('');
        setProductDescription8('');
        setProductPrice('');
        setProductImage('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    const closeNavOnOutsideClick = (event) => {
      fetch('http://localhost:3000/setcommoniter')
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error:', error));
      if (isNavVisible) {
        const header = document.querySelector('.red-header');
        if (header && !header.contains(event.target)) {
          setNavVisible(false);
        }
      }
    };

    document.addEventListener('click', closeNavOnOutsideClick);

    return () => {
      document.removeEventListener('click', closeNavOnOutsideClick);
    };
  }, [isNavVisible]);
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
      <div className="product-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link
              to={`/productpage/${product.id}`}
              onClick={() => localStorage.setItem('product', JSON.stringify(product))}
            >
              <img src={product.image} alt={product.name} className="product-image" />
            </Link>
            <h3 className="product-name">
              <Link
                to={`/productpage/${product.id}`}
                onClick={() => localStorage.setItem('product', JSON.stringify(product))}
                className="link-black"
              >
                {truncate(product.name, 35)}
              </Link>
            </h3>
            <p className="product-description">{truncate(product.description, 50)},{truncate(product.description3, 50)}</p>
            <h2>฿{product.price}</h2>
          </div>
        ))}
      </div>
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
          {isAdmin && (
            <li>
              <button onClick={toggleAddProductModal}>Add Product</button>
            </li>
          )}
          <p className="color-text">sri.puttipong@gmail.com</p>
          <p className="color-text">Facebook : Bank Puttipong</p>
          <p className="color-text">Instagram : bankk.p</p>
        </ul>
      </nav>

      {showAddProductModal && (

        <div className="add-product-modal">
          <h2>Add Product</h2>
          <label htmlFor="productName">Product Name:</label> <br />
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          /> <br /> <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
          <label htmlFor="productDescription">Product Description:</label> <br />
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          /></div>
            <div>
              <label htmlFor="productDescription2">Product Description2:</label> <br />
              <textarea
                id="productDescription2"
                value={productDescription2}
                onChange={(e) => setProductDescription2(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="productDescription3">Product Description3:</label> <br />
              <textarea
                id="productDescription3"
                value={productDescription3}
                onChange={(e) => setProductDescription3(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="productDescription4">Product Description4:</label> <br />
              <textarea
                id="productDescription4"
                value={productDescription4}
                onChange={(e) => setProductDescription4(e.target.value)}
              />
            </div>
          </div><br /> <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
          <label htmlFor="productDescription5">Product Description5:</label> <br />
          <textarea
            id="productDescription5"
            value={productDescription5}
            onChange={(e) => setProductDescription5(e.target.value)}
          /></div>
          <div>
          <label htmlFor="productDescription6">Product Description6:</label> <br />
          <textarea
            id="productDescription6"
            value={productDescription6}
            onChange={(e) => setProductDescription6(e.target.value)}
          /></div>
          <div>
          <label htmlFor="productDescription7">Product Description7:</label> <br />
          <textarea
            id="productDescription7"
            value={productDescription7}
            onChange={(e) => setProductDescription7(e.target.value)}
          /></div>
          <div>
          <label htmlFor="productDescription8">Product Description8:</label> <br />
          <textarea
            id="productDescription8"
            value={productDescription8}
            onChange={(e) => setProductDescription8(e.target.value)}
          />
          </div>
          </div>
          <br /> <br />
          <label htmlFor="productPrice">Product Price:</label> <br />
          <input
            type="text"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          /><br /> <br />
          <label htmlFor="productImage">Product Image URL:</label>
          <input
            type="text"
            id="productImage"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            className="product-image-input"
          /> <br /> <br />
          <div>
            <button onClick={handleAddProduct} style={{ marginRight: '10px' }}>Add Product</button>
            <button onClick={toggleAddProductModal}>Cancel</button>
          </div>


        </div>

      )}
    </div>
  );
}

export default Setcom;
