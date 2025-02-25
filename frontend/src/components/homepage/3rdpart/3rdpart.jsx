import React, { useState, useEffect } from 'react';
import NavBarButton from '../../navbar/NavBarButton';
import './3rdpart.css';

const ThirdPart = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const ramadanDate = new Date('2025-03-01T00:00:00');

    const timer = setInterval(() => {
      const now = new Date();
      const difference = ramadanDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="third-part-container">
      <div className="third-part-content">
        <div className="left-side">
          <h2>Join Our Ramadan Journey</h2>
          <div className="countdown-timer">
            <h3>Time until Ramadan 2025:</h3>
            <div className="timer-values">
              <span>{timeLeft.days}d </span>
              <span>{timeLeft.hours}h </span>
              <span>{timeLeft.minutes}m </span>
              <span>{timeLeft.seconds}s</span>
            </div>
          </div>
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
