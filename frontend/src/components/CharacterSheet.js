import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"

import { API_URL } from '../reusables/urls'
import Loader from "./Loader"
import TextInput from "./TextInput"
import RangeInput from "./RangeInput"

import currentCharacter from "reducers/currentCharacter"

const CharacterSheet = () => {
  const [isLoading, setIsLoading] = useState(true)

  const characterId = useSelector(store => store.user.currentCharacter)
  const accessToken = useSelector(store => store.user.accessToken)
  const character = useSelector(store => store.currentCharacter.character)

  const history = useHistory()
  const dispatch = useDispatch()

  const inputs = []

  useEffect(() => {
    if (!characterId) {
      history.push("/UserGallery");
    }

    if (characterId) {
      const options = {
        method: "GET",
        headers: {
          Authorization: accessToken
        }
      }
      fetch(API_URL(`characters/${characterId}`), options)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          dispatch(currentCharacter.actions.setCharacter(data))
          setIsLoading(false)
        })
        .catch(error => console.log(error))
    }
  }, [history, dispatch, accessToken, characterId])

  const onCharacterSheetSave = () => {
    const options = {
      method: "PATCH",
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: character.name,
        profession: character.profession,
        background: character.background,
        other: character.other,
        stats: character.stats
      })
    }
    fetch(API_URL(`characters/${characterId}`), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.log(error))
  }

  const onInputChange = (value, id) => {
    let updatedCharacter = { ...character }
    updatedCharacter[id] = value
    dispatch(currentCharacter.actions.setCharacter(updatedCharacter))
  }

  const onStatInputChange = (value, id) => {
    let updatedCharacter = { ...character, stats: { ...character.stats } }
    updatedCharacter.stats[id] = +value
    dispatch(currentCharacter.actions.setCharacter(updatedCharacter))
  }

  if (character) {
    for (const [key, value] of Object.entries(character.stats)) {
      inputs.push(<RangeInput
        key={key}
        label={key}
        value={value}
        onInputChange={onStatInputChange}
      />)
    }
  }

  return (
    <section className="sheet-container">
      {isLoading && <Loader />}
      {!isLoading &&
        <div className="sheet-content">
          <div className="sheet-top-row">
            <img className="sheet-image" src={character.image} alt="character" />
            <div className="sheet-text-inputs">
              <TextInput onInputChange={onInputChange} label="name" value={character.name} />

              <TextInput onInputChange={onInputChange} label="profession" value={character.profession} />

              <TextInput onInputChange={onInputChange} label="background" value={character.background} />
            </div>
          </div>

          <div className="sheet-range-container">
            {inputs}
          </div>
          <div className="sheet-text-area-container">
            <label htmlFor="other">Other</label>
            <textarea
              rows="4"
              cols="35"
              value={character.other}
              id="other"
              onChange={(e) => onInputChange(e.target.value, e.target.id)}
            >
              {character.other}
            </textarea>
          </div>

          <button className="save-sheet-button" onClick={onCharacterSheetSave} >
            <img src="../assets/save.svg" alt="save icon" className="card-icon" />
            Save character sheet
          </button>
        </div>}
    </section>
  )
}

export default CharacterSheet