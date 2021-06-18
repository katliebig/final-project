import React from "react"

const RangeInput = ({ onInputChange, label, value }) => {
  return (
    <div className="range-input">
      <label htmlFor={label}>{label}</label>
      <input
        className="range-slider"
        type="range"
        id={label}
        value={value}
        min={0}
        max={20}
        onChange={(e) => onInputChange(e.target.value, e.target.id)}
      />
      <div className="output-value-container">
        <output className="output-value">
          {value}
        </output>
      </div>
    </div>
  )
}

export default RangeInput