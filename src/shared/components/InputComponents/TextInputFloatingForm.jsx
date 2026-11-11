import React from 'react'

const TextInputFloatingForm = ({ id, label, onChange, value, isError }) => {
  return (<div className="form-floating mb-3">
    <input
      type="text"
      className={`form-control ${isError ? "is-invalid" : null}`}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <label htmlFor={id}>{label}</label>
  </div>);
}

export default TextInputFloatingForm;