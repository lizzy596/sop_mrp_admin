import React, { useState, useEffect } from 'react'
import ChatMessage from './ChatMessage.feat'
import moment from "moment"

const ViewChatModal = ({ isOpen, toggle, data, title }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (data?.messages?.length > 0)
      setMessages(data.messages);
  }, [data?.messages])
  return (
    <div
      className={`modal modal-xl fade ${isOpen ? 'show' : ''}`}
      tabIndex="-1"
      style={{ display: isOpen ? 'block' : 'none' }}
    >

      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {`${data?.user?.email} - ${moment(data?.createdAt).format("MM-DD-YY")}`}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={toggle}
            ></button>
          </div>
          <div className="modal-body">
            <div className="card shadow-sm" style={{ height: 'calc(100vh - 200px)' }}>
              <div className="card-header bg-primary text-white d-flex align-items-center">
                <i className="bi bi-robot me-2"></i>
                <h5 className="mb-0">{""}</h5>
              </div>

              <div className="card-body ai-chat-body p-3 overflow-auto">
                {messages?.length > 0 ? messages.map((message) => (<ChatMessage message={message} key={message.id} />)) : []}
              </div>

            </div>


          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => toggle()}
            >
              Close
            </button>
          </div>
        </div></div>

    </div>
  );
}

export default ViewChatModal;