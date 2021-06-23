import React from 'react';

const HomeCard = ({ title, text, imgUrl }) => {
  return (
    <div className="home-card">
      <div>
        <h3 className="home-card-title">
          {title}
        </h3>
        <p className="home-card-text">
          {text}
        </p>
      </div>
      <img className="card-image" id="home-card-image" src={imgUrl} alt={title} />
    </div>
  )
}

export default HomeCard