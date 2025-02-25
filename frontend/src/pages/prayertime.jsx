import React, { useState, useEffect } from 'react';
import LocationSelector from '../components/prayertime/LocationSelector';
import PrayerCard from '../components/prayertime/PrayerCard';
import NextPrayer from '../components/prayertime/NextPrayer'; // Import the NextPrayer component
import './prayertime.css';

const PrayerTime = () => {
  const [selectedCountry, setSelectedCountry] = useState('Algeria');
  const [selectedCity, setSelectedCity] = useState('Algiers');
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = today.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=${selectedCity}&country=${selectedCountry}&method=8`
        );
        const data = await response.json();
        setPrayerTimes(data.data.timings);
        setDate(data.data.date);
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      }
    };

    fetchPrayerTimes();
  }, [selectedCity, selectedCountry]);

  const prayers = prayerTimes ? [
    { name: 'Fajr', time: prayerTimes.Fajr },
    { name: 'Sunrise', time: prayerTimes.Sunrise },
    { name: 'Dhuhr', time: prayerTimes.Dhuhr },
    { name: 'Asr', time: prayerTimes.Asr },
    { name: 'Maghrib', time: prayerTimes.Maghrib },
    { name: 'Isha', time: prayerTimes.Isha }
  ] : [];

  const getCurrentPrayer = () => {
    if (!prayerTimes) return null;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayerTimesInMinutes = {
      Fajr: timeToMinutes(prayerTimes.Fajr),
      Sunrise: timeToMinutes(prayerTimes.Sunrise),
      Dhuhr: timeToMinutes(prayerTimes.Dhuhr),
      Asr: timeToMinutes(prayerTimes.Asr),
      Maghrib: timeToMinutes(prayerTimes.Maghrib),
      Isha: timeToMinutes(prayerTimes.Isha),
    };

    if (currentTime >= prayerTimesInMinutes.Isha || currentTime < prayerTimesInMinutes.Fajr) {
      return 'Isha';
    } else if (currentTime >= prayerTimesInMinutes.Fajr && currentTime < prayerTimesInMinutes.Sunrise) {
      return 'Fajr';
    } else if (currentTime >= prayerTimesInMinutes.Sunrise && currentTime < prayerTimesInMinutes.Dhuhr) {
      return 'Sunrise';
    } else if (currentTime >= prayerTimesInMinutes.Dhuhr && currentTime < prayerTimesInMinutes.Asr) {
      return 'Dhuhr';
    } else if (currentTime >= prayerTimesInMinutes.Asr && currentTime < prayerTimesInMinutes.Maghrib) {
      return 'Asr';
    } else {
      return 'Maghrib';
    }
  };

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const currentPrayer = getCurrentPrayer();

  return (
    <div className="prayer-time-container">
      <div className="prayer-header">
        <div className="header-left">
          <h1>Prayer Times</h1>
          <LocationSelector
            selectedCountry={selectedCountry}
            selectedCity={selectedCity}
            onCountryChange={setSelectedCountry}
            onCityChange={setSelectedCity}
          />
        </div>
      </div>

      <div className="prayer-cards">
        {prayers.map((prayer, index) => (
          <PrayerCard
            key={index}
            name={prayer.name}
            time={prayer.time}
            isUpcoming={prayer.name === currentPrayer}
          />
        ))}
      </div>

      <NextPrayer prayers={prayers} /> {/* Use the NextPrayer component */}
    </div>
  );
};

export default PrayerTime;
