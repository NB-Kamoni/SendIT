import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => (
  <footer className="footer-container">
    <div className="footer-content">
      <div className="link-columns">
        <div className="link-column">
          <h4 className="column-title">About</h4>
          <a href="#" className="link-item">Sitemap</a>
          <a href="#" className="link-item">Contact Us</a>
          <a href="#" className="link-item">Terms and Conditions</a>
          <a href="#" className="link-item">Privacy Policy</a>
        </div>
        <div className="link-column">
          <h4 className="column-title">Services</h4>
          <a href="#" className="link-item">Parcel Delivery</a>
          <a href="#" className="link-item">Real-Time Tracking</a>
          <a href="#" className="link-item">International Shipping</a>
          <a href="#" className="link-item">Customer Support</a>
        </div>
        <div className="link-column">
          <h4 className="column-title">Support</h4>
          <p className="support-item">+254 725 142 55</p>
          <p className="support-item">support@sendit.m</p>
        </div>
      </div>
      <div className="social-icons">
        <a href="#" className="social-icon"><FaFacebookF /></a>
        <a href="#" className="social-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 50 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="x-logo"
          >
            <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
          </svg>
        </a>
        <a href="#" className="social-icon"><FaInstagram /></a>
        <a href="#" className="social-icon"><FaLinkedinIn /></a>
      </div>
    </div>
  </footer>
);

export default Footer;
