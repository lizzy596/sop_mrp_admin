import React, { useState, useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage.feat'

const ChatLoading = () => {
  return (<div className="d-flex justify-content-start mb-3">
    <div className="bg-white border p-3 rounded-3 shadow-sm">
      <div className="d-flex align-items-center">
        <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="text-muted">Thinking...</span>
      </div>
    </div>
  </div>)
}

// const ChatMessage = ({ message }) => {
//   return (
//     <div className={`d-flex mb-3 ${message.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>

//       <div
//         className={`p-3 rounded-3 shadow-sm ai-chat-message-wrap ${message.role === 'user'
//           ? 'bg-primary text-white'
//           : 'bg-white border'
//           }`}
//       >

//         {message.role === 'assistant' && (
//           <div className="d-flex align-items-center mb-2">
//             <i className="bi bi-robot me-2 text-primary"></i>
//             <small className="text-muted">Nexus AI</small>
//           </div>
//         )}

//         <div className='ai-chat-message-text'>{message.content}</div>

//         <small
//           className={`d-block mt-2 ai-chat-ts ${message.role === 'user' ? 'text-white-50' : 'text-muted'}`}>
//           {typeof message.timestamp === "string" ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//         </small>
//       </div>
//     </div>
//   )
// }

const AgentChatCard = ({ messageList, agent, handleSendMessage }) => {
  //console.log(messages)
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(messageList);
    //console.log(messageList)
  }, [messageList])

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    // messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;



    const userMessage = {
      id: Date.now(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const updated = await handleSendMessage(userMessage.content);
      setMessages(updated);
    } catch (err) { console.error(err) }


    setIsLoading(false);



    // TODO: Replace with actual API call
    // Simulate assistant response
    // setTimeout(() => {
    //   const botMessage = {
    //     id: Date.now() + 1,
    //     content: "This is a placeholder response. Please connect this to your chatbot API.",
    //     role: 'assistant',
    //     timestamp: new Date()
    //   };
    //   //  setMessages(prev => [...prev, botMessage]);
    //   setIsLoading(false);
    // }, 1000);


  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="card shadow-sm" style={{ height: 'calc(100vh - 200px)' }}>
      <div className="card-header bg-primary text-white d-flex align-items-center">
        <i className="bi bi-robot me-2"></i>
        <h5 className="mb-0">{agent?.title}</h5>
      </div>

      <div className="card-body ai-chat-body p-3 overflow-auto">
        {messages?.length > 0 ? messages.map((message) => (<ChatMessage message={message} key={message.id} />)) : []}
        {isLoading && (<ChatLoading />)}
        <div ref={messagesEndRef} />
      </div>


      <div className="card-footer bg-white border-top">
        <div className="input-group">
          <textarea
            ref={inputRef}
            className="form-control"
            placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            // onKeyPress={handleKeyPress}
            rows="2"
            style={{ resize: 'none' }}
            disabled={isLoading}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
          >
            <i className="bi bi-send-fill me-1"></i>
            Send
          </button>
        </div>
        <small className="text-muted mt-2 d-block">
          <i className="bi bi-info-circle me-1"></i>
          {agent?.description}
        </small>
      </div>
    </div>
  );
}

export default AgentChatCard;