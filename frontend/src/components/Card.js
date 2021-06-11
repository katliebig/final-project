import React from 'react';

const Card = ({ title, text, imgUrl, onRaceChosen }) => {
  return (
    <div
      className="card-container"
      onClick={() => onRaceChosen(title.toLowerCase())}
      tabIndex="0"
      role="button"
    >
      <img className="card-image" src={imgUrl} alt={title} />
      <h2 className="card-title">
        {title}
      </h2>
      <p className="card-text">
        {text}
      </p>
    </div>
  )
}

export default Card