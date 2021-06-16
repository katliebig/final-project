import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"

import { API_URL } from '../reusables/urls'
import Loader from "./Loader"

import currentCharacter from "reducers/currentCharacter"

const CharacterSheet = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState("")
  const [profession, setProfession] = useState("")
  const [background, setBackground] = useState("")

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
  }, [history])


  const onCharacterSheetSave = () => {
    const options = {
      method: "PATCH",
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: character.name, profession: character.profession, background: character.background })
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
      {
        isLoading && <Loader />
      }
      {
        !isLoading &&
        <>
          <img src={character.image} />

          <label htmlFor="name" >Name</label>
          <input type="text" value={character.name} id="name" onChange={(e) => onInputChange(e.target.value, e.target.id)} />

          <label htmlFor="profession" >Profession</label>
          <input type="text" value={character.profession} id="profession" onChange={(e) => onInputChange(e.target.value, e.target.id)} />

          <label htmlFor="background" >Background</label>
          <input type="text" value={character.background} id="background" onChange={(e) => onInputChange(e.target.value, e.target.id)} />

          <button onClick={onCharacterSheetSave} >Save character sheet</button>
        </>
      }
    </section>
  )
}

export default CharacterSheet