import React from "react";

const SMTPForm = () => {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="smtpHost" className="form-label">
          Host
        </label>
        <input type="password" className="form-control" id="smtpHost" />
      </div>
      <div className="mb-3">
        <label htmlFor="smtpUsername" className="form-label">
          Username
        </label>
        <input type="password" className="form-control" id="smtpUsername" />
      </div>
      <div className="mb-3">
        <label htmlFor="smtpPassword" className="form-label">
          Password
        </label>
        <input type="password" className="form-control" id="smtpPassword" />
      </div>
      <div className="mb-3">
        <label htmlFor="smtpFrom" className="form-label">
          From
        </label>
        <input type="password" className="form-control" id="smtpFrom" />
      </div>
      <button className="btn btn-primary" >
        Submit
      </button>
    </form>
  );
};

export default SMTPForm;
