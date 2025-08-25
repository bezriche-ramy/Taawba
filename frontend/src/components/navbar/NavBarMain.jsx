import React, { useState, useEffect } from 'react';
import NavBarLogo from './NavBarLogo';
import NavBarButton from './NavBarButton';
import Chatbot from '../chatbot/Chatbot';
import { useNavigate } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';
import './NavBar.css';

const NavBarMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
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

  // Listen for custom event to open chatbot from cards
  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsChatbotOpen(true);
    };

    window.addEventListener('openChatbot', handleOpenChatbot);

    return () => {
      window.removeEventListener('openChatbot', handleOpenChatbot);
    };
  }, []);
  
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
    setIsDropdownOpen(false);
    navigate('/');
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
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
    <>
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
          
          {/* Chatbot Button */}
          <button 
            className="chatbot-toggle-btn"
            onClick={toggleChatbot}
            title="Chat with تَوْبَة AI"
          >
            <FaRobot />
            <span className="btn-text">تَوْبَة AI</span>
          </button>
          
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

      {/* Chatbot Overlay */}
      {isChatbotOpen && (
        <div className="chatbot-overlay">
          <div className="chatbot-modal">
            <div className="chatbot-header">
              <h3>تَوْبَة - المساعد الذكي الإسلامي</h3>
              <button className="close-btn" onClick={toggleChatbot}>×</button>
            </div>
            <div className="chatbot-content">
              <Chatbot />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBarMain;
