import React from "react";

const GoogleForm = () => {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="googleClientId" className="form-label">
          Client ID
        </label>
        <input type="password" className="form-control" id="googleClientId" />
      </div>
      <div className="mb-3">
        <label htmlFor="googleClientSecret" className="form-label">
          Client Secret
        </label>
        <input
          type="password"
          className="form-control"
          id="googleClientSecret"
        />
      </div>
      <button className="btn btn-primary" >
        Submit
      </button>
    </form>
  );
};

export default GoogleForm;
