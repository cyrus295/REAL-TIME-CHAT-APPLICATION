import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

const socket = io('http://localhost:4000', { autoConnect: true });

function Chat() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Ask for username once
    const name = prompt('Enter your name:');
    const finalName = name?.trim() || `User${Math.floor(Math.random() * 1000)}`;
    setUsername(finalName);

    socket.emit('join', finalName);

    // ✅ Get chat history when joining
    socket.on('chat_history', (history) => {
      setMessages(history);
    });

    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on('user_connected', (data) => {
      setMessages((prev) => [
        ...prev,
        {
          user: 'System',
          message: `🔔 ${data.username} joined the chat`,
          time: new Date().toLocaleTimeString()
        }
      ]);
    });

    socket.on('user_disconnected', (data) => {
      setMessages((prev) => [
        ...prev,
        {
          user: 'System',
          message: `⚠️ ${data.username} left the chat`,
          time: new Date().toLocaleTimeString()
        }
      ]);
    });

    return () => {
      socket.off('chat_history');
      socket.off('receive_message');
      socket.off('user_connected');
      socket.off('user_disconnected');
    };
  }, []);

  const sendMessage = (msg) => {
    const timestamp = new Date().toLocaleTimeString();
    const messageData = { user: username, message: msg, time: timestamp };
    socket.emit('send_message', messageData);
    setMessages((prev) => [...prev, messageData]); // show instantly
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>💬 Welcome, {username}</h2>
      <ChatWindow messages={messages} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}

export default Chat;
