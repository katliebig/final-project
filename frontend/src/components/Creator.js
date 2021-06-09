import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import race from "../reducers/race"

import { API_URL } from '../reusables/urls'

import Loader from './Loader'
import CharacterRandomizer from "./CharacterRandomizer"
import SaveImageButton from './SaveImageButton'

const Creator = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [attribute, setAttribute] = useState("")
  const [character, setCharacter] = useState({
    hair: 0,
    eyebrows: 0,
    eyes: 0,
    ears: 0,
    nose: 0,
    mouth: 0,
    head: 0,
    clothes: 0,
    facialHair: 0,
    leftHorn: 0,
    rightHorn: 0
  })

  const chosenRace = useSelector(store => store.race.chosenRace)
  const attributes = useSelector(store => store.race.attributes)
  const imageSet = useSelector(store => store.race.imageSet)
  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push("/");
    }

    if (accessToken) {
      const options = {
        method: "GET",
        headers: {
          Authorization: accessToken
        }
      }
      fetch(API_URL(`races/${chosenRace}`), options)
        .then(res => res.json())
        .then(data => {
          dispatch(race.actions.setImageSet(data.urls))
          dispatch(race.actions.setAttributes(data.attributes))
          setIsLoading(false)
        })
        .catch(error => console.log(error))
    }
  }, [history, dispatch, accessToken, chosenRace])


  const onDecrementAttribute = () => {
    onAttributeChange(-1)
  }

  const onIncrementAttribute = () => {
    onAttributeChange(1)
  }

  const onAttributeChange = (change) => {
    let newCharacter = character
    newCharacter[attribute] = (character[attribute] + change) % imageSet[attribute].length
    if (newCharacter[attribute] === -1) {
      newCharacter[attribute] = imageSet[attribute].length - 1
    }
    setCharacter({ ...character, attribute: newCharacter[attribute] })
  }

  const onChooseRace = (e) => {
    setIsLoading(true)
    dispatch(race.actions.setChosenRace(e.target.value))
  }

  return (
    <div className="creator-container">

      <button className="race-button" value="human" onClick={onChooseRace} >Human</button>
      <button className="race-button" value="tiefling" onClick={onChooseRace} >Tiefling</button>

      <select onChange={(e) => setAttribute(e.target.value)}>
        {attributes.map(attribute => (
          <option value={attribute} key={attribute} >{attribute}</option>
        ))}

      </select>
      <button onClick={onDecrementAttribute}>{"<"}-</button>
      <button onClick={onIncrementAttribute}>-{">"}</button>

      <SaveImageButton character={character} />

      <CharacterRandomizer setCharacter={setCharacter} />

      {isLoading && <Loader />}

      {!isLoading &&
        <div className="creator-image-container">
          {attributes.map(attribute => (
            < img className="creator-image" src={imageSet[attribute][character[attribute]]} alt={attribute} key={attribute} />
          ))}
        </div>
      }

    </div>
  )
}

export default Creator
