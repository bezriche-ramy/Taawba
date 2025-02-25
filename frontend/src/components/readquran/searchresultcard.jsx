import React from 'react';
import { Link } from 'react-router-dom';
import './searchcardresult.css';

const SearchResultCard = ({ id, suraName, translation, ayahCount, arabicName }) => {
  return (
    <Link to={`/surah/${id}`} className="search-result-card-link">
      <article className="search-result-card">
        
        <div className="surah-details">
          <p className="surah-translation">{translation}</p>
          <p className="ayah-count">Ayahs: {ayahCount}</p>
        </div>
        <div className="arabic-name">{arabicName}</div>
      </article>
    </Link>
  );
};

export default SearchResultCard;
