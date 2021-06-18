import React from "react"

const TextInput = ({ onInputChange, label, value }) => {
  return (
    <div className="text-input-container">
      <label htmlFor={label} >{label}</label>
      <input className="text-input" type="text" value={value} id={label} onChange={(e) => onInputChange(e.target.value, e.target.id)} />
    </div>
  )
}

export default TextInput