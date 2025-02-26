import React, { useState, useEffect } from 'react';
import './ayat.css';
import { FaBookmark, FaShareAlt, FaPlayCircle, FaInfoCircle } from 'react-icons/fa';

const Ayat = ({ surahNumber }) => {
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Mock English translations (in real app, fetch from translation API)
  const mockTranslations = {
    1: "In the Name of Allah—the Most Compassionate, Most Merciful.",
    2: "All praise is for Allah—Lord of all worlds,",
    3: "the Most Compassionate, Most Merciful,",
    4: "Master of the Day of Judgment.",
    5: "You ˹alone˺ we worship and You ˹alone˺ we ask for help.",
    6: "Guide us along the Straight Path,",
    7: "the Path of those You have blessed—not those You are displeased with, or those who are astray."
  };

  useEffect(() => {
    const fetchSurahData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSurahData(data.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching surah data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahData();
  }, [surahNumber]);

  if (loading) {
    return <div className="ayat-loading">Loading surah...</div>;
  }

  if (error) {
    return <div className="ayat-error">Error loading surah: {error}</div>;
  }

  if (!surahData) {
    return <div className="ayat-error">No surah data available</div>;
  }

  return (
    <div className="ayat-container">
      <div className="surah-header-wrapper">
        {/* Enhanced surah header information since the main header is removed */}
        {surahData && (
          <div className="surah-info-bar">
            <h2 className="surah-english-name">{surahData.englishName}</h2>
            <p className="surah-meta">{surahData.englishNameTranslation} • {surahData.revelationType} • {surahData.numberOfAyahs} Verses</p>
          </div>
        )}
        <div className="bismillah-wrapper">
          {surahNumber !== 9 && (
            <p className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          )}
        </div>
        <h1 className="surah-name-arabic">{surahData?.name}</h1>
      </div>
      
      <div className="ayat-list">
        {surahData.ayahs.map((ayah) => (
          <div className="ayah-container" key={ayah.number}>
            <div className="ayah-content">
              <div className="ayah-arabic-wrapper">
                <div className="ayah-arabic">{ayah.text}</div>
              </div>
              <div className="ayah-translation">
                {mockTranslations[ayah.numberInSurah] || "Translation not available"}
              </div>
            </div>
            
            <div className="ayah-info">
              <div className="ayah-number">
                <span>{surahNumber}:{ayah.numberInSurah}</span>
              </div>
              <div className="ayah-attribution">
                Translation by Dr. Mustafa Khattab, The Clear Quran <span className="change-link">(Change)</span>
              </div>
            </div>
            
            <div className="ayah-actions">
              <button className="action-button"><FaBookmark /></button>
              <button className="action-button"><FaShareAlt /></button>
              <button className="action-button"><FaPlayCircle /></button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="surah-info-button">
        <button><FaInfoCircle /> Surah Info</button>
      </div>
    </div>
  );
};

export default Ayat;
