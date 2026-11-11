import React from 'react';
import moment from 'moment';

const DevLogModal = ({ isOpen, toggle, data, title }) => {
  return (
    <div
      className={`modal fade ${isOpen ? 'show' : ''}`}
      tabIndex="-1"
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {title} - {data?.id}
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
            <form className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="inputTitle"
                  placeholder={moment(data?.timestamp).format(
                    'MM/DD/YY - hh:mm:ss a'
                  )}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="inputTitle"
                  placeholder={data?.user?.email || 'N/A'}
                  disabled
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputEmail4" className="form-label">
                  Topic
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputDescription"
                  placeholder={data?.topic}
                  disabled
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputEmail4" className="form-label">
                  Action
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputDescription"
                  placeholder={data?.action}
                  disabled
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputEmail4" className="form-label">
                  Payload
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputDescription"
                  placeholder={data?.payload}
                  disabled
                />
              </div>
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  id="inputDescription"
                  placeholder={data?.ip}
                  disabled
                />
              </div>
            </form>
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
        </div>
      </div>
    </div>
  );
};

export default DevLogModal;
