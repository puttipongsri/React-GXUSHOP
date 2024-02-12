import React from 'react';
import ReactDOM from 'react-dom/client'; // เปลี่ยนการนำเข้าจาก react-dom เป็น react-dom/client
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// เรียกใช้ reportWebVitals หลังจากที่แอพพลิเคชันได้รับการเริ่มต้น
reportWebVitals();
