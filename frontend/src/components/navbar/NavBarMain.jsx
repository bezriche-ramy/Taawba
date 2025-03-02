import React, { useState, useEffect } from 'react';
import NavBarLogo from './NavBarLogo';
import NavBarButton from './NavBarButton';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBarMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); //rami here is the user now update the front accordingly
  const navigate = useNavigate();
  const goToSignUp = () => navigate('/authentication');
  useEffect(() => {
    const getUser = () => {
      const userData = sessionStorage.getItem('user');
      setUser(userData ? JSON.parse(userData) : null);
    }
    getUser();
  },[])
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
        <NavBarButton type="explore" >Explore</NavBarButton>
        <NavBarButton type="signup" handleClick={goToSignUp}>Sign Up</NavBarButton>

      </div>

      <button className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>
    </nav>
  );
};

export default NavBarMain;
