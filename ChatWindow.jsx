import React from 'react';

function ChatWindow({ messages }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      height: '300px',
      overflowY: 'scroll',
      backgroundColor: '#f9f9f9'
    }}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            backgroundColor: '#e0f7fa',
            borderRadius: '8px',
            padding: '0.75rem',
            marginBottom: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
            {msg.user} <span style={{ fontSize: '0.8rem', color: '#555' }}>({msg.time})</span>
          </div>
          <div>{msg.message}</div>
        </div>
      ))}
    </div>
  );
}

export default ChatWindow;
