import React from 'react'

const ChatMessage = ({ message }) => {
  return (
    <div className={`d-flex mb-3 ${message.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>

      <div
        className={`p-3 rounded-3 shadow-sm ai-chat-message-wrap ${message.role === 'user'
          ? 'bg-primary text-white'
          : 'bg-white border'
          }`}
      >

        {message.role === 'assistant' && (
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-robot me-2 text-primary"></i>
            <small className="text-muted">Nexus AI</small>
          </div>
        )}

        <div className='ai-chat-message-text'>{message.content}</div>

        <small
          className={`d-block mt-2 ai-chat-ts ${message.role === 'user' ? 'text-white-50' : 'text-muted'}`}>
          {typeof message.timestamp === "string" ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </small>
      </div>
    </div>
  )
}

export default ChatMessage;