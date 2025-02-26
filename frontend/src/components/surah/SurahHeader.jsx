import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './SurahHeader.css';

const SurahHeader = ({ surahNumber }) => {
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
        const data = await response.json();
        setSurahData(data.data);
      } catch (error) {
        console.error('Error fetching surah:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahData();
  }, [surahNumber]);

  if (loading) {
    return <div className="surah-header-placeholder">Loading...</div>;
  }

  if (!surahData) {
    return <div className="surah-header-placeholder">Surah not found</div>;
  }

  return (
    <div className="surah-header">
      <div className="surah-header-content">
        <h1>
          <span className="surah-number">{surahData.number}.</span>
          <span className="surah-name">{surahData.englishName}</span>
          <span className="dropdown-icon"><FaChevronDown /></span>
        </h1>
        <div className="surah-subtitle">
          {surahData.englishNameTranslation} • {surahData.revelationType} • {surahData.numberOfAyahs} Verses
        </div>
      </div>
    </div>
  );
};

export default SurahHeader;
