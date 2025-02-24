import React from 'react';
import { Link } from 'react-router-dom';
import './fotter.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="https://i.ibb.co/5WHV4tdL/TAAWBA.png" alt="Taawba Logo" />
        </div>
        <nav className="footer-nav">
          <ul>
            <li><Link to="/prayer-times">Prayer Times</Link></li>
            <li><Link to="/quran-reading">Quran Reading</Link></li>
            <li><Link to="/reciter-profiles">Reciter Profiles</Link></li>
            <li><Link to="/ramadan-challenges">Ramadan Challenges</Link></li>
            <li><Link to="/community-forum">Community Forum</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>
        <div className="footer-bottom">
          <div className="legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookies Settings</Link>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} Tawba. All rights reserved 2025
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
