import React from 'react';
import './PrayerCard.css';

const PrayerCard = ({ name, time, isUpcoming }) => {
  return (
    <div className={`prayer-card ${isUpcoming ? 'upcoming' : ''}`}>
      <h3>{name}</h3>
      <p>{time}</p>
    </div>
  );
};

export default PrayerCard;
