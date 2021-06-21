import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from "react-redux"
import { useHistory } from "react-router-dom"

import race from "../reducers/race"

import { API_URL } from '../reusables/urls'

import Loader from './Loader'
import CharacterRandomizer from "./CharacterRandomizer"
import SaveImageButton from './SaveImageButton'
import CreatorNavButton from './CreatorNavButton'

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
    frontHair: 0,
    backHair: 0,
    leftHorn: 0,
    rightHorn: 0,
    background: 0
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
          if (data.success) {
            batch(() => {
              dispatch(race.actions.setImageSet(data.urls))
              dispatch(race.actions.setAttributes(data.attributes))
            })
            setCharacter({
              hair: 0,
              eyebrows: 0,
              eyes: 0,
              ears: 0,
              nose: 0,
              mouth: 0,
              head: 0,
              clothes: 0,
              facialHair: 0,
              frontHair: 0,
              backHair: 0,
              leftHorn: 0,
              rightHorn: 0,
              background: 0
            })
            setAttribute("")
            setIsLoading(false)
          } else {
            alert(data.message)
          }
        })
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
    newCharacter[attribute] = (character[attribute] + change + imageSet[attribute].length) % imageSet[attribute].length
    setCharacter({ ...character, attribute: newCharacter[attribute] })
  }

  const onRaceSelect = (e) => {
    setIsLoading(true)
    dispatch(race.actions.setChosenRace(e.target.value))
  }

  return (
    <section className="main creator">
      {isLoading && <Loader />}
      {!isLoading &&
        <>
          <CreatorNavButton
            onAttributeChange={onDecrementAttribute}
            attribute={attribute}
            direction="left"
          />

          <div className="creator-card">

            <select
              onChange={(e) => onRaceSelect(e)}
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
                defaultValue="default" >
                <option disabled hidden value="default">Select an attribute</option>
                {attributes.map(attribute => (
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

          <CreatorNavButton
            onAttributeChange={onIncrementAttribute}
            attribute={attribute}
            direction="right"
          />
        </>}
    </section >
  )
}

export default Creator
