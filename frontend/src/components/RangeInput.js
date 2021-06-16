import React from "react"

const RangeInput = ({ onInputChange, label, value }) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        type="range"
        id={label}
        value={value}
        min={0}
        max={20}
        onChange={(e) => onInputChange(e.target.value, e.target.id)}
      />
    </>
  )
}

export default RangeInput