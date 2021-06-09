import React from 'react';
import { useSelector } from "react-redux"

const CharacterRandomizer = ({ setCharacter }) => {
  const imageSet = useSelector(store => store.race.imageSet)
  const attributes = useSelector(store => store.race.attributes)

  const generateRandomNumber = (attribute) => {
    return Math.floor(Math.random() * imageSet[attribute].length);
  }
  const onRandomize = () => {
    let randomCharacter = {}

    for (const attribute of attributes) {
      randomCharacter[attribute] = generateRandomNumber(attribute)
    }

    setCharacter(randomCharacter)
  }

  return (
    <button onClick={onRandomize}>Randomize character</button>
  )
}

export default CharacterRandomizer
