import React from 'react';

const Select = ({
  id,
  label,
  defaultOption,
  onChange,
  value,
  options,
  disabled,
  valueKey,
  labelKey,
  isError
}) => {
  return (
    <div className="form-floating mb-3">
      <select
        className={`form-select ${isError ? "is-invalid" : null}`}

        id={id}
        onChange={onChange}
        value={value}
        disabled={disabled}
      >
        <option value={''}>{defaultOption}</option>
        {options.map((option) => (
          <option
            key={(valueKey && option?.[valueKey]) || option}
            value={(valueKey && option?.[valueKey]) || option}
          >
            {(labelKey && option?.[labelKey]) || option}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Select;
