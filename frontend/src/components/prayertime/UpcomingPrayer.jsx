import React from 'react';
import './UpcomingPrayer.css';

const UpcomingPrayer = ({ prayerName, time, countdown }) => {
  return (
    <div className="upcoming-prayer">
      <h2>Upcoming Prayer {prayerName}</h2>
      <div className="countdown">{countdown}</div>
      <p className="upcoming-time">{time}</p>
    </div>
  );
};

export default UpcomingPrayer;
