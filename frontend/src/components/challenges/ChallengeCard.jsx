import React, { useState } from 'react';
import './ChallengeCard.css';

const ChallengeCard = ({ name, description, icon, progress, isCompleted: initialIsCompleted, xpReward }) => {
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  
  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
    // Here you would typically make an API call to update the challenge status
  };

  // Function to render the appropriate icon based on the icon name
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'quran':
        return (
          <svg className="challenge-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" />
          </svg>
        );
      case 'prayer-mat':
        return (
          <svg className="challenge-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,3L2,12H5V20H19V12H22L12,3M12,8.5C14.34,8.5 16.46,9.43 18,10.94L16.8,12.12C15.58,10.91 13.88,10.17 12,10.17C10.12,10.17 8.42,10.91 7.2,12.12L6,10.94C7.54,9.43 9.66,8.5 12,8.5Z" />
          </svg>
        );
      case 'dhikr-beads':
        return (
          <svg className="challenge-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="challenge-card">
      <div className="challenge-icon-container">
        {renderIcon(icon)}
      </div>
      <div className="challenge-content">
        <h3 className="challenge-name">{name}</h3>
        <p className="challenge-description">{description}</p>
        
        <div className="challenge-status">
          <div className="checkbox-container">
            <input 
              type="checkbox" 
              className="challenge-checkbox" 
              checked={isCompleted} 
              onChange={handleCheckboxChange}
            />
            <label 
              className="challenge-checkbox-label" 
              onClick={handleCheckboxChange}
            >
              {isCompleted ? 'Completed' : 'Mark complete'}
            </label>
          </div>
          <span className="xp-reward">+{xpReward} XP</span>
        </div>
        
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
