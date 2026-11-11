import React from 'react';

const SelectRef = ({
  id,
  label,
  defaultOption,
  onChange,
  value,
  options,
  disabled,
}) => {
  return (
    <div className="form-floating mb-3">
      <select
        className="form-select"
        id={id}
        onChange={onChange}
        value={value}
        disabled={disabled}
      >
        <option value={''}>{defaultOption}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default SelectRef;
