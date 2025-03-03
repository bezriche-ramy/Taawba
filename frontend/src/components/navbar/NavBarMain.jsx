import React, { useState, useEffect } from 'react';
import NavBarLogo from './NavBarLogo';
import NavBarButton from './NavBarButton';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBarMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const goToSignUp = () => navigate('/authentication?mode=signup');
  const goToLogin = () => navigate('/authentication?mode=login');
  
  useEffect(() => {
    const getUser = () => {
      const userData = sessionStorage.getItem('user');
      setUser(userData ? JSON.parse(userData) : null);
    }
    getUser();
  },[])
  
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
    setIsDropdownOpen(false);
    navigate('/');
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
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
        
        {user ? (
          <div className="user-profile">
            <div className="profile-container" onClick={toggleDropdown}>
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="profile-picture"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : (
                <div className="default-avatar">
                  {getInitials(user.displayName || user.email)}
                </div>
              )}
              <span className="user-name">{user.displayName || user.email}</span>
            </div>
            
            {isDropdownOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-item" onClick={() => navigate('/profile')}>Profile</div>
                <div className="dropdown-item" onClick={() => navigate('/settings')}>Settings</div>
                <div className="dropdown-item logout" onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavBarButton type="login" handleClick={goToLogin}>Login</NavBarButton>
            <NavBarButton type="signup" handleClick={goToSignUp}>Sign Up</NavBarButton>
          </>
        )}
      </div>

      <button className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>
    </nav>
  );
};

export default NavBarMain;
