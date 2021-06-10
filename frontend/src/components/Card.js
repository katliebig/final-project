import React from 'react';

const Card = ({ title, text, imgUrl }) => {
  return (
    <div className="card-container">
      <img className="card-image" src={imgUrl} alt={title}/>
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