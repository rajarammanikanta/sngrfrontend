// src/components/Footer.js
import React from 'react';
import './index.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Phone: 7382618765, 7382628765</p>
        </div>
        <div className="footer-brand">
          <img src="https://cdn-icons-png.flaticon.com/128/26/26183.png" alt="logo" className="footer-logo"/>
          <div>
            <h4>SNGR SOFA WORLD</h4>
            <h4>VARAHI INTERIORS</h4>
          </div>
        </div>
        <div className="footer-services">
          <h4>Our Services</h4>
          <p>CUSTOMIZED | SOFA | CURTAINS | WALLPAPERS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
