import React from 'react';
import './CommunityStats.css';

const CommunityStats = ({ participants, startDate, endDate }) => {
  return (
    <div className="community-stats-container">
      <div className="participants-container">
        <div className="stats-icon">
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
          </svg>
        </div>
        <span className="stats-text">{participants.toLocaleString()} participants</span>
      </div>
      
      <div className="dates-container">
        <div className="date-item">
          <div className="stats-icon">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
            </svg>
          </div>
          <span className="stats-text">Starts: {startDate}</span>
        </div>
        
        <div className="date-item">
          <div className="stats-icon">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
            </svg>
          </div>
          <span className="stats-text">Ends: {endDate}</span>
        </div>
      </div>
    </div>
  );
};

export default CommunityStats;
