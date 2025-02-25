import React from 'react';
import { Link } from 'react-router-dom';
import './searchresultcard.css';

const SearchResultCard = ({ id, suraName, translation, ayahCount, arabicName }) => {
  return (
    <Link to={`/surah/${id}`} className="search-result-card-link">
      <div className="search-result-card">
        <div className="surah-number">{id}</div>
        <div className="surah-info">
          <h2 className="surah-name">{suraName}</h2>
          <p className="surah-translation">{translation}</p>
          <p className="ayah-count">{ayahCount} Ayahs</p>
        </div>
        <div className="arabic-name">{arabicName}</div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
