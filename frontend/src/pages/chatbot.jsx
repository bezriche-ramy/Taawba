import React from 'react';
import './chatbot.css';
import ContentCard from '../components/chatbot/ContentCard';
import MessageInput from '../components/chatbot/MessageInput';
import { FaPray, FaBook, FaQuran } from 'react-icons/fa';

const Chatbot = () => {
  // Sample content for the three cards
  const contentCards = [
    {
      title: "Dua to make",
      subtitle: "Dua for Forgiveness",
      icon: <FaPray className="card-icon" />
    },
    {
      title: "Islamic Quote",
      subtitle: "Words of Wisdom",
      icon: <FaBook className="card-icon" />
    },
    {
      title: "Quran Verse",
      subtitle: "Daily Inspiration",
      icon: <FaQuran className="card-icon" />
    }
  ];

  return (
    <div className="chatbot-container">
      <div className="chatbot-content">
        <div className="content-cards-container">
          {contentCards.map((card, index) => (
            <ContentCard 
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              icon={card.icon}
            />
          ))}
        </div>

        <div className="chat-area">
          {/* Chat messages would be displayed here */}
        </div>

        <MessageInput />

        <div className="disclaimer">
          <p>Please consult qualified Islamic scholars for religious rulings and guidance.</p>
          <a href="#subscribe" className="subscribe-link">Subscribe for more features</a>
        </div>

        <div className="guest-mode">
          <span>Guest Mode</span> | <a href="#exit">Exit</a>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
