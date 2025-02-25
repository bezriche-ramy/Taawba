import React from 'react';
import useScrollReveal from '../../../hooks/useScrollReveal';
import './secondpart.css';
import { FaMosque } from "react-icons/fa6";
import NavBarButton from '../../navbar/NavBarButton';

const SecondPart = () => {
  const headingRef = useScrollReveal('up');
  const textRef = useScrollReveal('up', 0.2);
  const buttonsRef = useScrollReveal('up', 0.4);
  const imageRef = useScrollReveal('right', 0.2);

  return (
    <div className="second-part">
      <div className="content-container">
        <div className="left-side">
          <FaMosque className="mosque-icon" />
          <h2 ref={headingRef}>Discover Ramadan's Beauty</h2>
          <p ref={textRef}>
            Join us in celebrating this holy month of reflection, community, and spiritual growth.
            Experience the true essence of Ramadan through our carefully curated resources and guides.
          </p>
          <div className="button-group" ref={buttonsRef}>
            <NavBarButton type="primary">Get Started</NavBarButton>
            <NavBarButton type="secondary">Learn More</NavBarButton>
          </div>
        </div>
        <div className="right-side" ref={imageRef}>
          <div className="image-container">
            <img src="https://images.pexels.com/photos/2087323/pexels-photo-2087323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Ramadan celebration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondPart;
