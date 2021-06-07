import React from 'react'

const CharacterImage = ({ src }) => {
  return (
    <img
      src={src}
      alt="character"
      className="character-image"
    />
  )
}

export default CharacterImage