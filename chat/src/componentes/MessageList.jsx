import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages }) => {
  const messageListRef = useRef(null);

  useEffect(() => {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="message-list" ref={messageListRef}>
      {messages.map(({ id, sender, content, timestamp }) => (
        <div key={id} className="message">
          <span className="sender">{sender}</span>
          <p className="message-content">{content}</p>
          <span className="timestamp">{new Date(timestamp).toLocaleString('es-ES')}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;





