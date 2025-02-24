import React from 'react';
import NavBarButton from '../navbar/NavBarButton';
import './FirstPart.css';

const FirstPart = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Embrace the Spirit of Ramadan Together</h1>
        <p>Welcome to our Ramadan celebration, a time for reflection, prayer, and community. Join us as we explore the beauty of the holy month and deepen our connection with faith.</p>
        <div className="hero-buttons">
          <NavBarButton type="explore">Learn More</NavBarButton>
          <NavBarButton type="signup">Sign Up</NavBarButton>
        </div>
      </div>
    </div>
  );
};

export default FirstPart;
