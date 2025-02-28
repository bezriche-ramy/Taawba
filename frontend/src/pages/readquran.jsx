import React, { useState } from 'react';
import NavBarMain from '../components/navbar/NavBarMain';
import NewSearchBar from '../components/readquran/NewSearchBar';
import SearchResultCard from '../components/readquran/searchresultcard';
import quranData from './quran.json';
import './readquran.css';

const ReadQuran = () => {
  const [filteredData, setFilteredData] = useState(quranData);

  const handleSearch = (query) => {
    const filtered = quranData.filter(surah =>
      surah.suraName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <NavBarMain />
      <div className="read-quran-container">
        <NewSearchBar onSearch={handleSearch} />
        <div className="search-results">
          {filteredData.map(surah => (
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
