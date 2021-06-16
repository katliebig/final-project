import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"

import { API_URL } from '../reusables/urls'
import Loader from "./Loader"

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
      body: JSON.stringify({
        name: character.name,
        profession: character.profession,
        background: character.background,
        other: character.other,
        strength: character.strength,
        dexterity: character.dexterity,
        constitution: character.constitution,
        intelligence: character.intelligence,
        wisdom: character.wisdom,
        charisma: character.charisma
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

  return (
    <section>
      {isLoading && <Loader />}
      {!isLoading &&
        <>
          <img src={character.image} alt="character" />

          <label htmlFor="name">Name</label>
          <input type="text" value={character.name} id="name" onChange={(e) => onInputChange(e.target.value, e.target.id)} />

          <label htmlFor="profession">Profession</label>
          <input type="text" value={character.profession} id="profession" onChange={(e) => onInputChange(e.target.value, e.target.id)} />

          <label htmlFor="background">Background</label>
          <input type="text" value={character.background} id="background" onChange={(e) => onInputChange(e.target.value, e.target.id)} />

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

          <label htmlFor="strength">Strength</label>
          <input
            type="range"
            id="strength"
            value={character.strength}
            min={0}
            max={20}
            onChange={(e) => onInputChange(e.target.value, e.target.id)}
          />

          <label htmlFor="dexterity">Dexterity</label>
          <input type="range" id="dexterity" value={character.dexterity} min="0" max="20"
            onChange={(e) => onInputChange(e.target.value, e.target.id)} />

          <label htmlFor="constitution">Constitution</label>
          <input type="range" id="constitution" value={character.constitution} min="0" max="20"
            onChange={(e) => onInputChange(e.target.value, e.target.id)} />

          <label htmlFor="intelligence">Intelligence</label>
          <input type="range" id="intelligence" value={character.intelligence} min="0" max="20"
            onChange={(e) => onInputChange(e.target.value, e.target.id)} />

          <label htmlFor="wisdom">Wisdom</label>
          <input type="range" id="wisdom" value={character.wisdom} min="0" max="20"
            onChange={(e) => onInputChange(e.target.value, e.target.id)} />

          <label htmlFor="charisma">Charisma</label>
          <input type="range" id="charisma" value={character.charisma} min="0" max="20"
            onChange={(e) => onInputChange(e.target.value, e.target.id)} />


          <button onClick={onCharacterSheetSave} >Save character sheet</button>
        </>}
    </section>
  )
}

export default CharacterSheet