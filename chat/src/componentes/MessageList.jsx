import React from 'react';


const MessageList = ({ messages }) => (
  <div className="message-list">
    {messages.map(({ id, sender, content, timestamp }) => (
      <div key={id} className="message">
        <span className="sender">{sender}</span>
        <p className="message-content">{content}</p>
        <span className="timestamp">{timestamp}</span>
      </div>
    ))}
  </div>
);

export default MessageList; 



