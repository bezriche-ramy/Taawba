import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBarMain from '../components/navbar/NavBarMain';
import Sidebar from '../components/surah/sidebar';
import Ayat from '../components/surah/ayat';
import { FaBars } from 'react-icons/fa';
import './surah.css';

const Surah = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [surahId, setSurahId] = useState(parseInt(id) || 1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const numId = parseInt(id);
    if (!numId || numId < 1 || numId > 114) {
      navigate('/surah/1');
      return;
    }
    setSurahId(numId);
    
    // Add responsive check
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [id, navigate]);

  return (
    <div className="surah-page">
      <NavBarMain />
      
      <div className="surah-layout">
        <Sidebar selectedSurahId={surahId} />
        <main className="main-content">
          <Ayat surahNumber={surahId} />
        </main>
      </div>
      
      {isMobile && (
        <div className="mobile-indicator">
          <FaBars />
          <span>Swipe right to navigate</span>
        </div>
      )}
    </div>
  );
};

export default Surah;
