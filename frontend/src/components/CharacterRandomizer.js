import React from 'react';
import { useSelector } from "react-redux"

const CharacterRandomizer = ({ setCharacter }) => {
  const imageSet = useSelector(store => store.raceImageSet.imageSet)

  const generateRandomNumber = (attribute) => {
    return Math.floor(Math.random() * imageSet[attribute].length);
  }
  const onRandomize = () => {
    let randomCharacter = {
      hair: generateRandomNumber("hair"),
      eyebrows: generateRandomNumber("eyebrows"),
      eyes: generateRandomNumber("eyes"),
      ears: generateRandomNumber("ears"),
      nose: generateRandomNumber("nose"),
      mouth: generateRandomNumber("mouth"),
      head: generateRandomNumber("head"),
      clothes: generateRandomNumber("clothes")
    }
    setCharacter(randomCharacter)
  }

  return (
    <button onClick={onRandomize}>Randomize character</button>
  )
}

export default CharacterRandomizer
