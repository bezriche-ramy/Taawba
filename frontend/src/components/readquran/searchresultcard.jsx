import React from 'react';
import { Link } from 'react-router-dom';
import './searchcardresult.css';

const SearchResultCard = ({ id, suraName, translation, ayahCount, arabicName }) => {
  return (
    <Link to={`/surah/${id}`} className="surah-card">
      <div className="surah-card__number">{id}</div>
      <div className="surah-card__content">
        <div className="surah-card__header">
          <h3 className="surah-card__title">{suraName}</h3>
          <span className="surah-card__verses">{ayahCount} verses</span>
        </div>
        <p className="surah-card__translation">{translation}</p>
      </div>
      <div className="surah-card__arabic">
        <span className="surah-card__arabic-name">{arabicName}</span>
      </div>
    </Link>
  );
};

export default SearchResultCard;
