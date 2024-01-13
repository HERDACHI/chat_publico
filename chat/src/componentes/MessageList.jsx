import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages }) => {
  const messageListRef = useRef(null);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
 
  useEffect(() => {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="message-list" ref={messageListRef}>
      {messages.map(({ id, sender, content, timestamp }) => {
        const formattedTimestamp = new Intl.DateTimeFormat('es-ES', options).format(new Date(timestamp));
        
        return (
          <div key={id} className="message">
            <span className="sender">{sender}</span>
            <p className="message-content">{content}</p>
            <span className="timestamp">{formattedTimestamp}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;




