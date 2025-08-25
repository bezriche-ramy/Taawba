import React, { useState } from 'react';
import { FaPaperPlane, FaCog } from 'react-icons/fa';
import './MessageInput.css';

const MessageInput = ({ onSendMessage, isDarkMode }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isSending) return;

    setIsSending(true);
    await onSendMessage(message.trim());
    setMessage('');
    setIsSending(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`message-input-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <form onSubmit={handleSubmit} className="message-form">
        <div className="input-wrapper">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="اكتب سؤالك عن الإسلام..."
            className={`message-input ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
            disabled={isSending}
          />
          <button
            type="submit"
            className={`send-button ${isDarkMode ? 'dark-mode' : 'light-mode'} ${isSending ? 'sending' : ''}`}
            disabled={!message.trim() || isSending}
          >
            {isSending ? (
              <FaCog className="sending-icon" />
            ) : (
              <FaPaperPlane className="send-icon" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
