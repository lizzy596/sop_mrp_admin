import React from "react";

const ItemModal = ({ isOpen, toggle, data, title }) => {
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
              {title} {data?.id ? `#${data.id}` : ""}
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
                <label htmlFor="inputItemNumber" className="form-label">
                  Item Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputItemNumber"
                  placeholder={data?.itemNumber}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputQuantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputQuantity"
                  placeholder={data?.quantity}
                  disabled
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputDescription" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputDescription"
                  placeholder={data?.description || "No description provided"}
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

export default ItemModal;