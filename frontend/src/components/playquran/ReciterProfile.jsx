import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import './ReciterProfile.css';

const ReciterProfile = ({ reciter }) => {
  const [showFullBio, setShowFullBio] = useState(false);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);

  const toggleBio = () => {
    setShowFullBio(!showFullBio);
  };

  const toggleRadio = () => {
    setIsRadioPlaying(!isRadioPlaying);
    // Here you would implement actual radio functionality
    // For example, streaming the reciter's channel
  };

  return (
    <div className="reciter-profile">
      <div className="profile-header">
        <div className="profile-image">
          <img src={reciter.image} alt={reciter.name} />
        </div>
        <h2 className="reciter-name">{reciter.name}</h2>
      </div>
      
      <div className="profile-bio">
        <p>{showFullBio ? reciter.fullBio : reciter.bio}</p>
      </div>
      
      <div className="profile-actions">
        <button 
          className="bio-toggle-btn" 
          onClick={toggleBio}
        >
          {showFullBio ? 'Less' : 'More'}
        </button>
        
        <button 
          className={`radio-play-btn ${isRadioPlaying ? 'playing' : ''}`} 
          onClick={toggleRadio}
        >
          <FaPlay className="play-icon" />
          {isRadioPlaying ? 'Stop Radio' : 'Play Radio'}
        </button>
      </div>
    </div>
  );
};

export default ReciterProfile;
