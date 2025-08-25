import React from 'react';
import { FaUser, FaRobot, FaExclamationTriangle, FaStar } from 'react-icons/fa';
import './ChatMessage.css';

const ChatMessage = ({ message, isUser, isDarkMode }) => {
  const messageClass = isUser ? 'user-message' : 'bot-message';
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return (
    <div className={`modern-message ${messageClass} ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="message-avatar">
        {isUser ? (
          <div className="user-avatar">
            <FaUser className="avatar-icon" />
          </div>
        ) : (
          <div className="bot-avatar">
            <FaRobot className="avatar-icon" />
          </div>
        )}
      </div>
      <div className="message-content-wrapper">
        <div className="message-bubble">
          <div className="message-text">{message.text}</div>
          <div className="message-time">{formattedTime}</div>
        </div>
        {message.isWelcome && (
          <div className="welcome-indicator">
            <FaStar className="indicator-icon" />
            <span>Welcome message</span>
          </div>
        )}
        {message.isError && (
          <div className="error-indicator">
            <FaExclamationTriangle className="indicator-icon" />
            <span>Error occurred</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
