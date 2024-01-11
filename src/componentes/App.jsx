import '../App.css';
import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import NickWindow from './NickWindow';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [nick, setNick] = useState('');
  const [showNickInput, setShowNickInput] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/mensajes', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        setMessages(data);
        console.log('Mensajes cargados correctamente desde la base de datos.');
      })
      .catch(error => {
        console.error('Error al cargar mensajes desde la base de datos:', error);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('http://localhost:3001/mensajes', {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          setMessages(data);
          console.log('Mensajes actualizados correctamente desde la base de datos.');
        })
        .catch(error => {
          console.error('Error al actualizar mensajes desde la base de datos:', error);
        });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSendMessage = (newMessage) => {
    console.log("newMessage:", newMessage)
    setMessages([...messages, newMessage]);
    fetch('http://localhost:3001/mensajes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al guardar el mensaje en la base de datos.');
        }
        console.log('Mensaje guardado correctamente en la base de datos.');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleNickSubmit = (nick) => {
    setNick(nick);
    setShowNickInput(false);
  };

  return (
    <div className="chat-container">
      {showNickInput ? (
        <NickWindow onNickSubmit={handleNickSubmit} />
      ) : (
        <>
          <MessageList messages={messages} />
          <MessageInput onSendMessage={handleSendMessage} nick={nick} />
        </>
      )}
    </div>
  );
};

export default App;
