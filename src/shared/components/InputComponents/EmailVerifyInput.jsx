import React from 'react';

const EmailVerifyInput = ({ id, label, placeholder, value, setValue, disabled, feedbackText, isVerified }) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className="input-group">
        <span className={`input-group-text ${isVerified ? "text-success" : "text-danger"}`} id={`${id}icn`}>{isVerified ? "\u2713" : "!"}</span>
        <input
          type="text"
          className="form-control"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={setValue ? (e) => setValue(e.target.value) : null}
          disabled={disabled}
        />
      </div>
      {feedbackText ? (<div className="form-text" id={`${id}feedback`}>{`${feedbackText}`}</div>) : (<div className="form-text">{" "}</div>)}

    </>
  );
};

export default EmailVerifyInput;