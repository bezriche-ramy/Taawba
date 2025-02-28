import React, { useState, useEffect } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';
import './ReciterProfile.css';

const ReciterProfile = ({ reciter }) => {
  const [showFullBio, setShowFullBio] = useState(false);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch audio files when component mounts
    const fetchAudioFiles = async () => {
      try {
        const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${reciter.id}`);
        const data = await response.json();
        setAudioFiles(data.audio_files || []);
      } catch (error) {
        console.error('Error fetching audio files:', error);
      }
    };

    fetchAudioFiles();

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [reciter.id]);

  const playRandomSurah = async () => {
    if (audioFiles.length > 0) {
      setLoading(true);
      try {
        // Get random audio file
        const randomIndex = Math.floor(Math.random() * audioFiles.length);
        const randomAudio = audioFiles[randomIndex];

        // Stop current audio if playing
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }

        // Create and play new audio
        const newAudio = new Audio(randomAudio.audio_url);
        newAudio.addEventListener('ended', () => {
          setIsRadioPlaying(false);
          setAudio(null);
        });
        
        await newAudio.play();
        setAudio(newAudio);
        setLoading(false);
      } catch (error) {
        console.error('Error playing audio:', error);
        setLoading(false);
        setIsRadioPlaying(false);
      }
    }
  };

  const toggleRadio = () => {
    if (isRadioPlaying) {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        setAudio(null);
      }
    } else {
      playRandomSurah();
    }
    setIsRadioPlaying(!isRadioPlaying);
  };

  const toggleBio = () => {
    setShowFullBio(!showFullBio);
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
          disabled={loading}
        >
          {isRadioPlaying ? <FaStop className="play-icon" /> : <FaPlay className="play-icon" />}
          {loading ? 'Loading...' : isRadioPlaying ? 'Stop Radio' : 'Play Radio'}
        </button>
      </div>
    </div>
  );
};

export default ReciterProfile;
