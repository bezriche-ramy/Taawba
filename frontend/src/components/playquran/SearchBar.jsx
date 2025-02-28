import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './NewSearchBar.css';

const NewSearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="new-search-container">
      <form onSubmit={handleSearch} className="new-search-form">
        <FaSearch className="new-search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search Surah..."
          className="new-search-input"
        />
      </form>
    </div>
  );
};

export default NewSearchBar;
