import React from 'react';
import './ContentCard.css';

const ContentCard = ({ title, subtitle, iconType }) => {
  return (
    <div className="content-card">
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-subtitle">{subtitle}</p>
      </div>
      <div className={`card-icon ${iconType}-icon`}>
        <span className="icon-inner"></span>
      </div>
    </div>
  );
};

export default ContentCard;
