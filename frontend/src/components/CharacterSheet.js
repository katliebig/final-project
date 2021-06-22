import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"

import { API_URL } from '../reusables/urls'
import Loader from "./Loader"
import TextInput from "./TextInput"
import RangeInput from "./RangeInput"
import PopUp from './PopUp'

import currentCharacter from "reducers/currentCharacter"

const CharacterSheet = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showPopUp, setShowPopUp] = useState(false)

  const characterId = useSelector(store => store.user.currentCharacter)
  const accessToken = useSelector(store => store.user.accessToken)
  const character = useSelector(store => store.currentCharacter.character)

  const dispatch = useDispatch()

  const inputs = []

  useEffect(() => {
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
          if (data.success) {
            dispatch(currentCharacter.actions.setCharacter(data.character))
            setIsLoading(false)
          } else {
            alert(data.message)
          }
        })
    }
  }, [dispatch, accessToken, characterId])

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
        if (data.success) {
          setShowPopUp(true)
          setTimeout(() => setShowPopUp(false), 3000)
        } else {
          alert(data.message)
        }
      })
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
    <div className="sheet-content">
      {isLoading && <Loader />}
      {!isLoading &&
        <>
          <TextInput onInputChange={onInputChange} label="name" value={character.name} disabled={false} />
          <div className="sheet-second-row">
            <img className="sheet-image" src={character.image} alt="character" />
            <div className="sheet-text-inputs">

              <TextInput onInputChange={onInputChange} label="race" value={character.race} disabled={true} />

              <TextInput onInputChange={onInputChange} label="profession" value={character.profession} disabled={false} />

              <TextInput onInputChange={onInputChange} label="background" value={character.background} disabled={false} />
            </div>
          </div>

          <Carousel className="sheet-range-container sheet-range-container-mobile" showStatus={false} swipeable={false}>
            {inputs}
          </Carousel>
          <div className="sheet-range-container sheet-range-container-desktop">
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

          <div className="save-button-container">
            {showPopUp && <PopUp text="Character sheet saved" />}
            <button className="save-sheet-button" onClick={onCharacterSheetSave} >
              <img src="../assets/save.svg" alt="save icon" className="card-icon" />
              Save character sheet
            </button>
          </div>
        </>}
    </div>
  )
}

export default CharacterSheet