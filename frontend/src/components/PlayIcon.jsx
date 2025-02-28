import React from 'react';

const PlayIcon = ({ size = 24 }) => {
  return (
    <img 
      src="https://i.ibb.co/TDJ4sLd1/icons8-play-64.png"
      width={size} 
      height={size} 
      alt="Play"
      style={{ 
        display: 'inline-block',
        verticalAlign: 'middle'
      }}
    />
  );
};

export default PlayIcon;
