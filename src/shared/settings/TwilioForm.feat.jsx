import React from "react";

const TwilioForm = () => {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="twilioSID" className="form-label">
          SID
        </label>
        <input type="password" className="form-control" id="twilioSID" />
      </div>
      <div className="mb-3">
        <label htmlFor="twilioAuthToken" className="form-label">
          Auth Token
        </label>
        <input type="password" className="form-control" id="twilioAuthToken" />
      </div>
      {/* TODO Make this phone number input field */}
      <div className="mb-3">
        <label htmlFor="twilioPhoneNumber" className="form-label">
          Phone Number
        </label>
        <input type="tel" className="form-control" id="twilioPhoneNumber" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
      </div>
      <button className="btn btn-primary" >
        Submit
      </button>
    </form>
  );
};

export default TwilioForm;
