import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message, isUser }) => {
  const messageClass = isUser ? 'user-message' : 'bot-message';
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return (
    <div className={`message ${messageClass}`}>
      <div className="message-bubble">
        <div className="message-content card-text">{message.text}</div>
        <div className="message-time">{formattedTime}</div>
      </div>
    </div>
  );
};

export const LoadingMessage = () => {
  return (
    <div className="message bot-message">
      <div className="loading-indicator">
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
