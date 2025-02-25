import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import quranData from '../../pages/quran.json';
import './sidebar.css';

const Sidebar = ({ selectedSurahId }) => {
  const [selectedSurah, setSelectedSurah] = useState(selectedSurahId);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedSurah(selectedSurahId);
  }, [selectedSurahId]);

  const handleSurahClick = (surahId) => {
    setSelectedSurah(surahId);
    navigate(`/surah/${surahId}`);
  };

  const filteredSurahs = quranData.filter(surah =>
    surah.suraName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.translation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar">
      <div className="sidebar-fixed-content">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="table-header">
          <div className="col-surah">Surah Name</div>
          <div className="col-verse">Verse</div>
        </div>
      </div>
      
      <div className="surah-list-container">
        {filteredSurahs.map(surah => (
          <div
            key={surah.id}
            className={`surah-item ${selectedSurah === surah.id ? 'selected' : ''}`}
            onClick={() => handleSurahClick(surah.id)}
          >
            <div className="surah-details">
              <span className="surah-number">{surah.id}.</span>
              <div className="surah-text">
                <span className="name">{surah.suraName}</span>
                <span className="arabic">{surah.arabicName}</span>
              </div>
            </div>
            <div className="verse-number">{surah.ayahCount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
