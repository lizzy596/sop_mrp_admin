import React, { useState } from 'react'

const AgentHistoryCard = ({ onSelectSession, selectedSessionId, handleCreate, chatSessions }) => {
  // TODO: Replace with actual API call to fetch chat sessions
  // const [chatSessionsFake] = useState([
  //   {
  //     id: 1,
  //     title: "Device Configuration Help",
  //     preview: "How do I configure the device settings? How do I configure the device settings? How do I configure the device settings? How do I configure the device settings? How do I configure the device settings?",
  //     createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  //     messageCount: 5
  //   },
  //   {
  //     id: 2,
  //     title: "System Troubleshooting",
  //     preview: "I'm having issues with the system connection...",
  //     createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  //     messageCount: 8
  //   },
  //   {
  //     id: 3,
  //     title: "Firmware Update Questions",
  //     preview: "What's the process for updating firmware?",
  //     createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  //     messageCount: 12
  //   },
  //   {
  //     id: 4,
  //     title: "User Management",
  //     preview: "How can I add new users to the system?",
  //     createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  //     messageCount: 6
  //   },
  //   {
  //     id: 5,
  //     title: "API Integration",
  //     preview: "Tell me about the API endpoints...",
  //     createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  //     messageCount: 15
  //   },
  //   {
  //     id: 6,
  //     title: "Data Export",
  //     preview: "How do I export the data?",
  //     createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
  //     messageCount: 4
  //   },
  //   {
  //     id: 7,
  //     title: "Settings Configuration",
  //     preview: "Where are the system settings located?",
  //     createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  //     messageCount: 7
  //   },
  //   {
  //     id: 8,
  //     title: "Error Logs",
  //     preview: "How do I view error logs?",
  //     createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  //     messageCount: 3
  //   }
  // ]);

  const formatTimestamp = (iso) => {
    const date = new Date(iso)
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) {
      return 'Just now';
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleSessionClick = (session) => {
    if (onSelectSession) {
      onSelectSession(session?.id);
    }
  };

  return (
    <div className="card shadow-sm ai-chat-body">
      <div className="card-header bg-primary text-white d-flex align-items-center">
        <i className="bi bi-clock-history me-2"></i>
        <h5 className="mb-0">Chat History</h5>
      </div>

      <div className="card-body p-0 overflow-auto" style={{ height: 'calc(100% - 60px)' }}>
        {chatSessions?.length === 0 ? (
          <div className="p-4 text-center text-muted">
            <i className="bi bi-inbox fs-1 d-block mb-2"></i>
            <p>No chat history available</p>
          </div>
        ) : (
          <ul className="list-group list-group-flush">
            {chatSessions.map((session) => (
              <li
                key={session.id}
                onClick={() => handleSessionClick(session)}
                className={`list-group-item list-group-item-action cursor-pointer ${selectedSessionId === session.id ? 'active' : ''
                  }`}
                style={{
                  cursor: 'pointer',
                  borderLeft: selectedSessionId === session.id ? '4px solid #0d6efd' : '4px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <h6 className={`mb-0 ${selectedSessionId === session.id ? 'text-white' : ''}`}>
                      {/* {session.title} */}
                      {"Knowledge base question"}
                    </h6>
                    <small className={`${selectedSessionId === session.id ? 'text-white-50' : 'text-muted'}`}>
                      {formatTimestamp(session.createdAt)}
                    </small>
                  </div>
                  <p className={`mb-1 small ${selectedSessionId === session.id ? 'text-white-50' : 'text-muted'}`}>
                    {/* {session.preview} */}
                    {session?.messages?.length > 0 ? session?.messages[0].content : "New"}
                  </p>
                  <div className="d-flex align-items-center">
                    <i className={`bi bi-chat-dots me-1 ${selectedSessionId === session.id ? 'text-white-50' : 'text-muted'}`}></i>
                    {/* <small className={`${selectedSessionId === session.id ? 'text-white-50' : 'text-muted'}`}>
                      {session.messageCount} {session.messageCount === 1 ? 'message' : 'messages'}
                    </small> */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='card-footer bg-white border-top'>
        <button
          className="btn btn-primary w-100"
          type="button"
          onClick={handleCreate}
        >
          <i className="bi bi-plus-circle me-2"></i>
          New Chat
        </button>
      </div>
    </div>
  );
}

export default AgentHistoryCard;