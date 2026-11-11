import React from 'react'

const RangeSlider = ({ value, setValue, label, id, min, max, step }) => {
  return (
    <div>
      <label htmlFor={id} className="form-label">{`${label}: ${value}`}</label>
      <input id={id} type="range" className="form-range"
        min={`${min}`}
        max={`${max}`}
        step={`${step}`}
        value={value}
        onChange={(e) => { setValue(e.target.value) }} />
    </div>
  );
}

export default RangeSlider;