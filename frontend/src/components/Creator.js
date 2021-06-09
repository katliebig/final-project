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

  const imageSet = useSelector(store => store.race.imageSet)
  const chosenRace = useSelector(store => store.race.chosenRace)
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
      fetch(API_URL(`race/${chosenRace}`), options)
        .then(res => res.json())
        .then(data => {
          dispatch(race.actions.setImageSet(data))
          setIsLoading(false)
        })
        .catch(error => console.log(error))
    }
  }, [history, dispatch, accessToken, chosenRace])

  const onDecrementAttribute = () => {
    let newCharacter = character
    newCharacter[attribute] = (character[attribute] - 1)
    if (newCharacter[attribute] === -1) {
      newCharacter[attribute] = imageSet[attribute].length - 1
    }
    setCharacter(newCharacter)
  }

  const onIncrementAttribute = () => {
    let newCharacter = character
    newCharacter[attribute] = (character[attribute] + 1) % imageSet[attribute].length
    setCharacter(newCharacter)
  }

  const onAttributeChange = (change) => {
    let newCharacter = character
    if (character[attribute] < imageSet[attribute].length - 1) {
      newCharacter[attribute] = (character[attribute] + change) % imageSet[attribute].length
    }
    setCharacter(newCharacter)
  }



  return (
    <div className="creator-container">

      <input type="radio" id="human" name="race" value="human" onChange={(e) => dispatch(race.actions.setChosenRace(e.target.value))} />
      <label htmlFor="human">Human</label>
      <input type="radio" id="tiefling" name="race" value="tiefling" onChange={(e) => dispatch(race.actions.setChosenRace(e.target.value))} />
      <label htmlFor="tiefling">Tiefling</label>

      <select onChange={(e) => setAttribute(e.target.value)}>
        <option value="hair">Hair</option>
        <option value="eyebrows">Eyebrows</option>
        <option value="eyes">Eyes</option>
        <option value="ears">Ears</option>
        <option value="nose">Nose</option>
        <option value="mouth">Mouth</option>
        <option value="head">Head</option>
        <option value="clothes">Clothes</option>
        <option value="rightHorn">Right horn</option>
        <option value="leftHorn">Left horn</option>
        <option value="facialHair">Facial hair</option>
      </select>
      <button onClick={onDecrementAttribute}>{"<"}-</button>
      <button onClick={onIncrementAttribute}>-{">"}</button>
      <SaveImageButton character={character} />
      <CharacterRandomizer setCharacter={setCharacter} />
      {isLoading && <Loader />}
      {imageSet &&
        <div className="creator-image-container">
          <img className="creator-image" src={imageSet.head[character.head]} alt="head" />
          <img className="creator-image" src={imageSet.leftHorn[character.leftHorn]} alt="left horn" />
          <img className="creator-image" src={imageSet.hair[character.hair]} alt="hair" />
          <img className="creator-image" src={imageSet.ears[character.ears]} alt="ears" />
          <img className="creator-image" src={imageSet.eyebrows[character.eyebrows]} alt="eyebrows" />
          <img className="creator-image" src={imageSet.rightHorn[character.rightHorn]} alt="right horn" />
          <img className="creator-image" src={imageSet.eyes[character.eyes]} alt="eyes" />
          <img className="creator-image" src={imageSet.nose[character.nose]} alt="nose" />
          <img className="creator-image" src={imageSet.mouth[character.mouth]} alt="mouth" />
          {imageSet.clothes.length > 0 && <img className="creator-image" src={imageSet.clothes[character.clothes]} alt="clothes" />}
          <img className="creator-image" src={imageSet.facialHair[character.facialHair]} alt="facial hair" />
        </div>
      }
    </div>
  )
}

export default Creator
