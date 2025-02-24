import React from 'react';
import NavBarButton from '../../navbar/NavBarButton';
import './3rdpart.css';

const ThirdPart = () => {
  return (
    <div className="third-part-container">
      <div className="third-part-content">
        <div className="left-side">
          <h2>Join Our Ramadan Journey</h2>
          <p>Sign up for updates and join our engaging Ramadan activities to enrich your spiritual experience.</p>
          <div className="button-group">
            <NavBarButton type="signup">Sign Up</NavBarButton>
            <NavBarButton type="explore">Learn More</NavBarButton>
          </div>
        </div>
        <div className="right-side">
          <div className="image-frame">
            <img src="https://i.pinimg.com/736x/8f/1f/b1/8f1fb150eb8fa275c7ccb932f7d4682b.jpg" 
                 alt="Ramadan decoration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdPart;
