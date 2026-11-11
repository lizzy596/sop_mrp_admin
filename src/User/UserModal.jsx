import React from "react";

const UserModal = ({ isOpen, toggle, data, handleStatusChange, title }) => {
  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      tabIndex="-1"
      style={{ display: isOpen ? "block" : "none" }}
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
                <label htmlFor="inputEmail4" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control name-text"
                  id="inputEmail4"
                  placeholder={data?.firstName}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control name-text"
                  id="inputEmail4"
                  placeholder={data?.lastName}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  placeholder={data?.email}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Role
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  placeholder={data?.role}
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

export default UserModal;
