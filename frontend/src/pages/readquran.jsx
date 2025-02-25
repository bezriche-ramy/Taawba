import React, { useState } from 'react';
import NavBarMain from '../components/navbar/NavBarMain';
import SearchBar from '../components/readquran/searchbar';
import SearchResultCard from '../components/readquran/searchresultcard';
import quranData from './quran.json';
import './readquran.css';

const ReadQuran = () => {
  const [searchResults, setSearchResults] = useState(quranData);

  const handleSearch = (query) => {
    if (!query) {
      setSearchResults(quranData);
      return;
    }

    const filtered = quranData.filter(surah => 
      surah.suraName.toLowerCase().includes(query.toLowerCase()) ||
      surah.translation.toLowerCase().includes(query.toLowerCase()) ||
      surah.arabicName.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filtered);
  };

  return (
    <>
      <NavBarMain />
      <div className="read-quran-container">
        <SearchBar onSearch={handleSearch} />
        <div className="search-results">
          {searchResults.map(surah => (
            <SearchResultCard
              key={surah.id}
              id={surah.id}
              suraName={surah.suraName}
              translation={surah.translation}
              ayahCount={surah.ayahCount}
              arabicName={surah.arabicName}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ReadQuran;
