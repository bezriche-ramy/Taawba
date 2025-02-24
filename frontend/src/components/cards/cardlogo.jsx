import React from 'react';

const CardLogo = ({ imageSrc, altText }) => {
  return (
    <div className="card-logo">
      <img src={imageSrc} alt={altText} />
    </div>
  );
};

export default CardLogo;
