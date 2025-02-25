import React, { useState } from 'react';
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import './searchbar.css';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // Call the onSearch prop whenever input changes
  };

  const handleVoiceSearch = () => {
    // Implement voice search functionality here
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <FaSearch className="search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="What do you want to read?"
          className="search-input"
        />
        <div className="search-actions">
          <span className="keyboard-shortcut">ctrl + K</span>
          <button type="button" className="voice-button" onClick={handleVoiceSearch}>
            <FaMicrophone />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
