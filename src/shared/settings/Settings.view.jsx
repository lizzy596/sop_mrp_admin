import React from "react";

import { GoogleForm, AWSForm, TwilioForm, SMTPForm, ZenDeskForm } from "../Features/Settings"
// REST server .env
// Google - all
// AWS - all
// Twilio - all
// SMTP - host, username, password, from

const Settings = () => {
  return (
    <div className="container mt-4" style={{ overflow: "auto" }}>
      <div className="row mt-4">
        <h1>Google</h1>
        <div className="col">
          <GoogleForm />
        </div>
        <h1 className="mt-3">ZenDesk</h1>
        <div className="col">
          <ZenDeskForm />
        </div>

        <h1 className="mt-3">AWS</h1>
        <div className="col">
          <AWSForm />
        </div>
        <h1 className="mt-3">Twilio</h1>
        <div className="col">
          <TwilioForm />
        </div>
        <h1 className="mt-3">SMTP</h1>
        <div className="col">
          <SMTPForm />
        </div>
      </div>
    </div>
  );
};

export default Settings;
