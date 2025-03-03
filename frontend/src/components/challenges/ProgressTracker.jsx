import React, { useState, useEffect } from 'react';
import './ProgressTracker.css';

const ProgressTracker = ({ achievementLevel, totalDays }) => {
  const [currentRamadanDay, setCurrentRamadanDay] = useState(0);
  
  useEffect(() => {
    // Calculate which day of Ramadan it is today
    const calculateRamadanDay = () => {
      // Calculate the Ramadan start date so that today is the 4th day
      const today = new Date();
      const ramadanStartDate = new Date(today);
      ramadanStartDate.setDate(today.getDate() - 3); // This makes today the 4th day
      
      // Calculate difference in days
      const diffTime = today - ramadanStartDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      // Ensure we're within the valid range for Ramadan
      if (diffDays > 0 && diffDays <= 30) {
        setCurrentRamadanDay(diffDays);
      } else if (diffDays > 30) {
        // Ramadan has ended
        setCurrentRamadanDay(30);
      } else {
        // Ramadan hasn't started yet
        setCurrentRamadanDay(0);
      }
    };
    
    calculateRamadanDay();
    
    // Update every day at midnight
    const timer = setInterval(() => {
      calculateRamadanDay();
    }, 86400000); // 24 hours
    
    return () => clearInterval(timer);
  }, []);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < achievementLevel; i++) {
      stars.push(<span key={i} className="achievement-star">★</span>);
    }
    return stars;
  };

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const formattedDay = `${currentRamadanDay}${getOrdinalSuffix(currentRamadanDay)}`;
  const percentage = (currentRamadanDay / totalDays) * 100;
  
  // Display appropriate message based on Ramadan status
  let dayDisplay;
  if (currentRamadanDay === 0) {
    dayDisplay = "Awaiting Ramadan";
  } else if (currentRamadanDay === 30) {
    dayDisplay = "Last Day";
  } else {
    dayDisplay = `${formattedDay} Day`;
  }

  return (
    <div className="progress-tracker-container">
      <div className="achievement-stars">
        {renderStars()}
      </div>
      
      <div className="progress-circle">
        <div className="progress-circle-inner">
          <div className="days-completed">{formattedDay}</div>
          <div className="days-label">Day in Ramadan</div>
        </div>
        <svg className="progress-ring" width="200" height="200">
          <circle
            className="progress-ring-circle-bg"
            stroke="#e0f2f1"
            strokeWidth="10"
            fill="transparent"
            r="90"
            cx="100"
            cy="100"
          />
          <circle
            className="progress-ring-circle"
            stroke="#009688"
            strokeWidth="10"
            strokeLinecap="round"
            fill="transparent"
            r="90"
            cx="100"
            cy="100"
            style={{
              strokeDasharray: `${2 * Math.PI * 90}`,
              strokeDashoffset: `${2 * Math.PI * 90 * (1 - percentage / 100)}`
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export default ProgressTracker;
