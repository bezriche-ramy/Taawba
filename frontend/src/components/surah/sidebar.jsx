import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import quranData from '../../pages/quran.json';
import { FaBookOpen, FaLayerGroup, FaFileAlt, FaChevronLeft } from 'react-icons/fa';
import './sidebar.css';

const Sidebar = ({ selectedSurahId }) => {
  const [selectedSurah, setSelectedSurah] = useState(selectedSurahId);
  const [activeTab, setActiveTab] = useState('Surah');
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedSurah(selectedSurahId);
  }, [selectedSurahId]);

  const handleSurahClick = (surahId) => {
    setSelectedSurah(surahId);
    navigate(`/surah/${surahId}`);
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  // Removed searchTerm state and filteredSurahs filter
  // Now we'll just use the quranData directly

  // Create arrays for Juz and Page tabs
  const juzArray = Array.from({ length: 30 }, (_, i) => i + 1);
  const pageArray = Array.from({ length: 604 }, (_, i) => i + 1);

  return (
    <div className={`quran-sidebar ${expanded ? 'expanded' : ''}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <FaChevronLeft className={expanded ? 'rotate' : ''} />
      </div>
      
      <div className="sidebar-content">
        {/* Search box removed */}
        
        <div className="sidebar-tabs">
          <button 
            className={`tab ${activeTab === 'Surah' ? 'active' : ''}`} 
            onClick={() => setActiveTab('Surah')}
          >
            <FaBookOpen />
            <span>Surah</span>
          </button>
          <button 
            className={`tab ${activeTab === 'Juz' ? 'active' : ''}`} 
            onClick={() => setActiveTab('Juz')}
          >
            <FaLayerGroup />
            <span>Juz</span>
          </button>
          <button 
            className={`tab ${activeTab === 'Page' ? 'active' : ''}`} 
            onClick={() => setActiveTab('Page')}
          >
            <FaFileAlt />
            <span>Page</span>
          </button>
        </div>
        
        {activeTab === 'Surah' && (
          <div className="list-container surah-list">
            {quranData.map(surah => (
              <div 
                key={surah.id} 
                className={`list-item ${selectedSurah === surah.id ? 'selected' : ''}`}
                onClick={() => handleSurahClick(surah.id)}
              >
                <div className="surah-details">
                  <div className="surah-number">{surah.id}</div>
                  <div className="surah-info">
                    <div className="surah-name">{surah.suraName}</div>
                    <div className="surah-arabic">{surah.arabicName}</div>
                  </div>
                </div>
                <div className="verse-count">{surah.ayahCount}</div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'Juz' && (
          <div className="list-container juz-list">
            {juzArray.map(juz => (
              <div key={juz} className="list-item">
                <div className="juz-number">Juz {juz}</div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'Page' && (
          <div className="list-container page-list">
            {pageArray.map(page => (
              <div key={page} className="list-item">
                <div className="page-number">Page {page}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
