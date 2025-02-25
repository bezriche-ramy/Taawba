import React, { useState, useEffect } from 'react';
import './NextPrayer.css';

const NextPrayer = ({ prayers }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);

  useEffect(() => {
    if (!prayers || prayers.length === 0) return;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    let nextPrayerName = null;
    let nextPrayerTime = null;

    for (let i = 0; i < prayers.length; i++) {
      const prayerTimeInMinutes = timeToMinutes(prayers[i].time);
      if (prayerTimeInMinutes > currentTime) {
        nextPrayerName = prayers[i].name;
        nextPrayerTime = prayers[i].time;
        break;
      }
    }

    if (!nextPrayerName) {
      nextPrayerName = prayers[0].name;
      nextPrayerTime = prayers[0].time;
    }

    setNextPrayer({ name: nextPrayerName, time: nextPrayerTime });

    const updateCountdown = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      let prayerTimeInMinutes = timeToMinutes(nextPrayerTime);

      if (prayerTimeInMinutes < currentTime) {
        prayerTimeInMinutes += 24 * 60;
      }

      const difference = prayerTimeInMinutes - currentTime;
      const hours = Math.floor(difference / 60);
      const minutes = difference % 60;

      setTimeRemaining({ hours, minutes });
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 60000);

    return () => clearInterval(intervalId);
  }, [prayers]);

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  if (!nextPrayer) {
    return <p>Loading...</p>;
  }

  return (
    <div className="upcoming-prayer">
      <h3>Next Prayer: {nextPrayer.name}</h3>
      {timeRemaining && (
        <div className="countdown">
          {timeRemaining.hours}h {timeRemaining.minutes}m
        </div>
      )}
      <div className="upcoming-time">Time: {nextPrayer.time}</div>
    </div>
  );
};

export default NextPrayer;
