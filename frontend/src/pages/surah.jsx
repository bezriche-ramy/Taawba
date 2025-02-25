import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBarMain from '../components/navbar/NavBarMain';
import Sidebar from '../components/surah/sidebar';
import quranData from './quran.json';
import './surah.css';

const Surah = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSurah, setCurrentSurah] = useState(null);

  useEffect(() => {
    const surah = quranData.find(s => s.id === parseInt(id));
    if (!surah) {
      navigate('/readquran'); // Redirect if surah not found
      return;
    }
    setCurrentSurah(surah);
  }, [id, navigate]);

  return (
    <div className="surah-container">
      <NavBarMain />
      <div className="surah-content">
        <div className="main-content">
          {currentSurah && (
            <div className="surah-header">
              <h1>{currentSurah.suraName}</h1>
              <h2>{currentSurah.arabicName}</h2>
              <div className="surah-info">
                <p className="translation">{currentSurah.translation}</p>
                <p className="verse-count">Verses: {currentSurah.ayahCount}</p>
              </div>
            </div>
          )}
        </div>
        <div className="bottom-sidebar">
          <Sidebar selectedSurahId={parseInt(id)} />
        </div>
      </div>
    </div>
  );
};

export default Surah;
