import React from 'react';

const HomeCard = ({ title, text, imgUrl }) => {
  return (
    <div className="card">
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

export default HomeCard