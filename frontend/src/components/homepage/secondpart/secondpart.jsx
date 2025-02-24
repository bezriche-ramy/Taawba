import React from 'react';
import useScrollReveal from '../../../hooks/useScrollReveal';
import './secondpart.css';
import { FaMosque } from 'react-icons/fa';
import NavBarButton from '../../navbar/NavBarButton';

const SecondPart = () => {
  const leftSideRef = useScrollReveal('left');
  const rightSideRef = useScrollReveal('right');

  return (
    <div className="second-part">
      <div className="content-container">
        <div className="left-side" ref={leftSideRef}>
          <FaMosque className="mosque-icon" />
          <h2>Discover Ramadan's Beauty</h2>
          <p>
            Join us in celebrating this holy month of reflection, community, and spiritual growth.
            Experience the true essence of Ramadan through our carefully curated resources and guides.
          </p>
          <div className="button-group">
            <NavBarButton type="primary">Get Started</NavBarButton>
            <NavBarButton type="secondary">Learn More</NavBarButton>
          </div>
        </div>
        <div className="right-side" ref={rightSideRef}>
          <div className="image-container">
            <img src="https://images.pexels.com/photos/2087323/pexels-photo-2087323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Ramadan celebration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondPart;
