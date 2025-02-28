import React from 'react';
import NavBarButton from '../../../components/navbar/NavBarButton';
import './FirstPart.css';
import { useNavigate } from 'react-router-dom';

const FirstPart = () => {
  const navigate = useNavigate();
  const goToSignUp = () => navigate('/authentication');
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Embrace the Spirit of Ramadan Together</h1>
        <p>Welcome to our Ramadan celebration, a time for reflection, prayer, and community. Join us as we explore the beauty of the holy month and deepen our connection with faith.</p>
        <div className="hero-buttons">
          <NavBarButton type="explore">Learn More</NavBarButton>
          <NavBarButton type="signup" handleClick={goToSignUp}>Sign Up</NavBarButton>
        </div>
      </div>
    </div>
  );
};

export default FirstPart;
