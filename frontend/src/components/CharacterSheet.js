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

  useEffect(() => {
    if (!characterId) {
      history.push("/");
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
      body: JSON.stringify({ character })
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
    dispatch(
      currentCharacter.actions.setCharacter(updatedCharacter))
  }
  const onStatInputChange = (value, id) => {
    let updatedCharacter = { ...character, stats: { ...character.stats } }
    updatedCharacter.stats[id] = value
    dispatch(currentCharacter.actions.setCharacter(updatedCharacter))
  }

  return (
    <section>
      {isLoading && <Loader />}
      {!isLoading &&
        <>
          <img src={character.image} alt="character" />

          <TextInput onInputChange={onInputChange} label="name" value={character.name} />

          <TextInput onInputChange={onInputChange} label="profession" value={character.profession} />

          <TextInput onInputChange={onInputChange} label="background" value={character.background} />

          <label htmlFor="other">Other</label>
          <textarea
            rows="4"
            cols="50"
            value={character.other}
            id="other"
            onChange={(e) => onInputChange(e.target.value, e.target.id)}
          >
            {character.other}
          </textarea>

          {
            Object.entries(character.stats).map(stat => (
              <RangeInput
                key={stat[0]}
                onInputChange={onStatInputChange}
                label={stat[0]}
                value={stat[1]}
              />
            ))
          }

          {/* <RangeInput
            onInputChange={onInputChange}
            label="strength"
            value={character.strength}
          />
          <RangeInput
            onInputChange={onInputChange}
            label="dexterity"
            value={character.dexterity}
          />
          <RangeInput
            onInputChange={onInputChange}
            label="constitution"
            value={character.constitution}
          />
          <RangeInput
            onInputChange={onInputChange}
            label="intelligence"
            value={character.intelligence}
          />
          <RangeInput
            onInputChange={onInputChange}
            label="wisdom"
            value={character.wisdom}
          />
          <RangeInput
            onInputChange={onInputChange}
            label="charisma"
            value={character.charisma}
          /> */}

          <button onClick={onCharacterSheetSave} >Save character sheet</button>
        </>}
    </section>
  )
}

export default CharacterSheet