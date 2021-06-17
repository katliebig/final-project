import React from 'react';

const Card = ({ title, text, imgUrl, onRaceChosen }) => {
  return (
    <div
      className="card race-card"
      onClick={() => onRaceChosen(title.toLowerCase())}
      tabIndex="0"
      role="button"
    >
      <div className="card-background">
        <h2 className="card-title">
          {title}
        </h2>
        <img className="card-image" src={imgUrl} alt={title} />
        <p className="card-text">
          {text}
        </p>
      </div>
    </div>
  )
}

export default Card