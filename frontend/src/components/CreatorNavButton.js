import React from "react"

const CreatorNavButton = ({ onAttributeChange, attribute, direction }) => {
  return (

    <button
      onClick={onAttributeChange}
      className="creator-button arrow-button"
      disabled={attribute === "" ? true : false}
    >
      <img
        src={`./assets/${direction}.svg`}
        alt={`${direction} arrow icon`}
        className="creator-icon"
      />
    </button>
  )
}

export default CreatorNavButton