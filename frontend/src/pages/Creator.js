import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from "react-redux"
import { useHistory } from "react-router-dom"

import race from "../reducers/race"
import { API_URL } from '../reusables/urls'

import Loader from '../components/Loader'
import CreatorCard from 'components/CreatorCard'
import CreatorNavButton from '../components/CreatorNavButton'

const Creator = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [attribute, setAttribute] = useState("")
  const [character, setCharacter] = useState({})

  const accessToken = useSelector(store => store.user.accessToken)
  const chosenRace = useSelector(store => store.race.chosenRace)
  const imageSet = useSelector(store => store.race.imageSet)

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
            // reset everything, randomize character
            let newCharacter = {}
            for (const attribute of data.attributes) {
              newCharacter[attribute] = Math.floor(Math.random() * data.urls[attribute].length)
            }
            setCharacter(newCharacter)
            setAttribute("")
            setIsLoading(false)
          } else {
            alert(data.message)
          }
        })
    }
  }, [history, dispatch, accessToken, chosenRace])

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
            onAttributeChange={() => onAttributeChange(-1)}
            attribute={attribute}
            direction="left"
          />

          <CreatorCard
            onRaceSelect={onRaceSelect}
            character={character}
            setAttribute={setAttribute}
            setCharacter={setCharacter}
          />

          <CreatorNavButton
            onAttributeChange={() => onAttributeChange(1)}
            attribute={attribute}
            direction="right"
          />
        </>}
    </section >
  )
}

export default Creator
