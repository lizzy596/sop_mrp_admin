import React from "react";

const ZenDeskForm = () => {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="zendeskSubdomain" className="form-label">
          Subdomain
        </label>
        <input type="password" className="form-control" id="zendeskSubdomain" />
      </div>
      <div className="mb-3">
        <label htmlFor="zendeskEmail" className="form-label">
          Email
        </label>
        <input type="password" className="form-control" id="zendeskEmail" />
      </div>
      <div className="mb-3">
        <label htmlFor="zendeskApiToken" className="form-label">
          API Token
        </label>
        <input type="password" className="form-control" id="zendeskApiToken" />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ZenDeskForm;
