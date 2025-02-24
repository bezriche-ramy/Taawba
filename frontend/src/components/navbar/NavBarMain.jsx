import React, { useState } from 'react';
import NavBarLogo from './NavBarLogo';
import NavBarButton from './NavBarButton';
import './NavBar.css';

const NavBarMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
      <NavBarLogo />
      
      <div className="nav-links">
        <a href="#" className="nav-link">Quran Reading</a>
        <a href="#" className="nav-link">Rectors Hub</a>
        <a href="#" className="nav-link">Ramadan Challenge</a>
        <a href="#" className="nav-link">More Links ▼</a>
      </div>

      <div className="nav-buttons">
        <NavBarButton type="explore">Explore</NavBarButton>
        <NavBarButton type="signup">Sign Up</NavBarButton>
      </div>

      <button className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>
    </nav>
  );
};

export default NavBarMain;
