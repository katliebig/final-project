import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"

import characters from '../reducers/characters'
import { API_URL } from '../reusables/urls'

import CharacterImage from './CharacterImage'
import Loader from './Loader'

const UserGallery = () => {
  const [isLoading, setIsLoading] = useState(true)
  const charactersArray = useSelector(store => store.characters.charactersByUser)
  const id = useSelector(store => store.user.id)
  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()

  const onCharacterDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this character?")) {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: accessToken
        }
      }
      fetch(API_URL(`characters/users/${id}`), options)
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
    }
  }

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
      fetch(API_URL(`characters/users/${id}`), options)
        .then(res => res.json())
        .then(data => {
          dispatch(characters.actions.setCharactersByUser(data))
          setIsLoading(false)
        })
        .catch(error => console.log(error))
    }
  }, [dispatch, history, id, accessToken, onCharacterDelete])

  return (
    <section>
      {isLoading && <Loader />}
      {charactersArray.map(character => (
        <div key={character._id}>
          <button onClick={() => onCharacterDelete(character._id)} >Click to delete</button>
          <CharacterImage
            src={character.image}
          />
        </div>
      ))}
    </section>
  )
}

export default UserGallery
