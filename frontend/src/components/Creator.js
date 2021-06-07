import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import mergeImages from 'merge-images'

import raceImageSet from "../reducers/raceImageSet"

import { API_URL } from '../reusables/urls'

import Loader from './Loader'
import CharacterRandomizer from "./CharacterRandomizer"

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
    clothes: 0
  })

  const imageSet = useSelector(store => store.raceImageSet.imageSet)
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
      fetch(API_URL("human"), options)
        .then(res => res.json())
        .then(data => {
          dispatch(raceImageSet.actions.setRaceImageSet(data))
          setIsLoading(false)
        })
        .catch(error => console.log(error))
    }
  }, [history, dispatch, accessToken])

  const onDecrementAttribute = () => {
    onAttributeChange(-1)
  }

  const onIncrementAttribute = () => {
    onAttributeChange(1)
  }

  const onAttributeChange = (change) => {
    let newCharacter = character
    if (character[attribute] < imageSet[attribute].length - 1) {
      newCharacter[attribute] = (character[attribute] + change) % character[attribute].length
    }
    setCharacter(newCharacter)
  }

  const onCharacterSave = () => {
    mergeImages([
      imageSet.hair[character.hair],
      imageSet.eyebrows[character.eyebrows],
      imageSet.eyes[character.eyes],
      imageSet.ears[character.ears],
      imageSet.nose[character.nose],
      imageSet.mouth[character.mouth],
      imageSet.head[character.head],
      imageSet.clothes[character.clothes]
    ], { crossOrigin: 'anonymous' })
      .then(b64 => {
        fetch(API_URL("characters"), {
          method: "POST",
          headers: {
            "Authorization": accessToken,
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({ image: b64 })
        })
          .then(res => res.json())
          .then(data => console.log(data))
      })
  }

  return (
    <div className="creator-container">
      <select onChange={(e) => setAttribute(e.target.value)}>
        <option value="hair">Hair</option>
        <option value="eyebrows">Eyebrows</option>
        <option value="eyes">Eyes</option>
        <option value="ears">Ears</option>
        <option value="nose">Nose</option>
        <option value="mouth">Mouth</option>
        <option value="head">Head</option>
        <option value="clothes">Clothes</option>
      </select>
      <button onClick={onDecrementAttribute}>{"<"}-</button>
      <button onClick={onIncrementAttribute}>-{">"}</button>
      <button onClick={onCharacterSave}>Save to gallery</button>
      <CharacterRandomizer setCharacter={setCharacter} />
      {isLoading && <Loader />}
      {imageSet &&
        <div className="creator-image-container">
          <img className="creator-image" src={imageSet.hair[character.hair]} alt="hair" />
          <img className="creator-image" src={imageSet.eyebrows[character.eyebrows]} alt="eyebrows" />
          <img className="creator-image" src={imageSet.eyes[character.eyes]} alt="eyes" />
          <img className="creator-image" src={imageSet.ears[character.ears]} alt="ears" />
          <img className="creator-image" src={imageSet.nose[character.nose]} alt="nose" />
          <img className="creator-image" src={imageSet.mouth[character.mouth]} alt="mouth" />
          <img className="creator-image" src={imageSet.head[character.head]} alt="head" />
          <img className="creator-image" src={imageSet.clothes[character.clothes]} alt="clothes" />
        </div>
      }
    </div>
  )
}

export default Creator
