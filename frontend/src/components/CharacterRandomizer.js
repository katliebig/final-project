import React from 'react'
import { useSelector } from "react-redux"

const CharacterRandomizer = ({ setCharacter }) => {
  const imageSet = useSelector(store => store.race.imageSet)
  const attributes = useSelector(store => store.race.attributes)

  const generateRandomNumber = (attribute) => {
    return Math.floor(Math.random() * imageSet[attribute].length)
  }

  const onRandomize = () => {
    let randomCharacter = {}

    for (const attribute of attributes) {
      randomCharacter[attribute] = generateRandomNumber(attribute)
    }

    setCharacter(randomCharacter)
  }

  return (
    <button onClick={onRandomize} className="creator-button">
      <img src="./assets/d20.svg" alt="d20 icon" className="card-icon" />
      Randomize
    </button>
  )
}

export default CharacterRandomizer
