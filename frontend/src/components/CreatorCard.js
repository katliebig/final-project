import React from "react"
import { useSelector } from "react-redux"

import CharacterRandomizer from "../components/CharacterRandomizer"
import SaveImageButton from '../components/SaveImageButton'

const CreatorCard = ({ onRaceSelect, character, setCharacter, setAttribute }) => {
  const chosenRace = useSelector(store => store.race.chosenRace)
  const attributes = useSelector(store => store.race.attributes)
  const imageSet = useSelector(store => store.race.imageSet)

  // this filter the attributes to exclude middleHair & bottomHair, 
  // the new array is used to render options in the select menu
  const attributesToSelect = attributes.filter(attribute => attribute !== "middleHair" && attribute !== "bottomHair")

  return (
    <div className="creator-card">

      <select
        onChange={onRaceSelect}
        defaultValue={chosenRace}
      >
        <option value="human">Human</option>
        <option value="tiefling">Tiefling</option>
        <option value="elf">Elf</option>
      </select>

      <div className="creator-card-image-container">
        {attributes.map(attribute => (
          <img
            className="creator-image"
            src={imageSet[attribute][character[attribute]]}
            alt={attribute}
            key={attribute}
          />
        ))}
      </div>

      <div className="creator-card-bottom-container">
        <select
          onChange={(e) => setAttribute(e.target.value)}
          defaultValue="default"
        >
          <option disabled hidden value="default">Select an attribute</option>
          {attributesToSelect.map(attribute => (
            <option
              value={attribute}
              key={attribute}
            >
              {attribute.replace(/([A-Z])/g, " $1")}
            </option>
          ))}
        </select>

        <div className="creator-card-button-container">
          <SaveImageButton character={character} />
          <CharacterRandomizer setCharacter={setCharacter} />
        </div>
      </div>

    </div>
  )
}

export default CreatorCard
