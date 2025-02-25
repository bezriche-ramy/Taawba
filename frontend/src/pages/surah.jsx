import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBarMain from '../components/navbar/NavBarMain';
import Sidebar from '../components/surah/sidebar';
import quranData from './quran.json';
import './surah.css';

const Surah = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentSurah, setCurrentSurah] = useState(null);

  useEffect(() => {
    const surah = quranData.find(s => s.id === parseInt(id));
    if (!surah) {
      navigate('/readquran'); // Redirect if surah not found
      return;
    }
    setCurrentSurah(surah);
  }, [id, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="surah-container">
      <NavBarMain />
      <div className={`surah-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? '←' : '→'}
        </button>
        <Sidebar isOpen={isSidebarOpen} selectedSurahId={parseInt(id)} />
        <div className="main-content">
          {currentSurah && (
            <div className="surah-header">
              <h1>{currentSurah.suraName}</h1>
              <h2>{currentSurah.arabicName}</h2>
              <p>{currentSurah.translation}</p>
              <p>Verses: {currentSurah.ayahCount}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Surah;
