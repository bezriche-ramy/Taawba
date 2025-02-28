import React from 'react';
import { FaPlay, FaDownload, FaShare } from 'react-icons/fa';
import './ChapterList.css';

const ChapterList = ({ chapters, onPlay, loading, audioFiles }) => {
  if (loading) {
    return <div className="chapters-loading">Loading chapters...</div>;
  }

  const handleShareChapter = (chapter) => {
    // Get the audio URL for this chapter
    const audioFile = audioFiles.find(file => file.chapter_id === chapter.id);
    
    if (navigator.share && audioFile) {
      navigator.share({
        title: `${chapter.suraName} (${chapter.arabicName})`,
        text: `Listen to Surah ${chapter.suraName} (${chapter.translation})`,
        url: audioFile.audio_url,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      alert(`Share URL: ${audioFile ? audioFile.audio_url : 'Audio not available'}`);
    }
  };

  const handleDownload = (chapter) => {
    const audioFile = audioFiles.find(file => file.chapter_id === chapter.id);
    
    if (audioFile) {
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = audioFile.audio_url;
      link.download = `${chapter.id}_${chapter.suraName}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="chapter-list">
      {chapters.length === 0 ? (
        <div className="no-chapters">No chapters found</div>
      ) : (
        chapters.map((chapter) => {
          const audioFile = audioFiles.find(file => file.chapter_id === chapter.id);
          const isPlayable = !!audioFile;
          
          return (
            <div key={chapter.id} className="chapter-item">
              <div className="chapter-play">
                <button 
                  className={`play-button ${!isPlayable ? 'disabled' : ''}`}
                  onClick={() => isPlayable && onPlay(chapter)}
                  disabled={!isPlayable}
                >
                  <FaPlay />
                </button>
              </div>
              
              <div className="chapter-info">
                <div className="chapter-number">{chapter.id}</div>
                <div className="chapter-names">
                  <span className="english-name">{chapter.suraName}</span>
                  <span className="arabic-name">{chapter.arabicName}</span>
                </div>
                <div className="chapter-translation">{chapter.translation}</div>
              </div>
              
              <div className="chapter-actions">
                <button 
                  className="action-button share-button"
                  onClick={() => handleShareChapter(chapter)}
                  disabled={!isPlayable}
                >
                  <FaShare />
                </button>
                <button 
                  className="action-button download-button"
                  onClick={() => handleDownload(chapter)}
                  disabled={!isPlayable}
                >
                  <FaDownload />
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChapterList;
