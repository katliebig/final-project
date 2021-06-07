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
  }, [dispatch, history, id, accessToken])

  return (
    <div>
      {isLoading && <Loader />}
      {charactersArray.map(character => (
        <CharacterImage
          key={character._id}
          src={character.image}
        />
      ))}
    </div>
  )
}

export default UserGallery
