import React from 'react';

const TextAreaInput = ({ id, label, placeholder, value, setValue, disabled, inputClassName, errors, ...rest }) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        type={rest?.type || "text"}
        className={`form-control ${errors ? "is-invalid" : ""} ${inputClassName ? inputClassName : ""}`}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={setValue ? (e) => setValue(e.target.value) : null}
        disabled={disabled}
        {...rest}
      />

      {errors ? (<div className="form-text text-danger" id={`${id}feedback`}>{`${errors}`}</div>) : (<div className="form-text">{" "}</div>)}

    </>
  );
};

export default TextAreaInput;