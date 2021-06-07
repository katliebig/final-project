import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import characters from '../reducers/characters'
import { API_URL } from '../reusables/urls'

import CharacterImage from './CharacterImage'

const Gallery = () => {
  const charactersArray = useSelector(store => store.characters.characters)

  const dispatch = useDispatch()

  useEffect(() => {
    fetch(API_URL("characters"))
      .then(res => res.json())
      .then(data => {
        dispatch(characters.actions.setCharacters(data))
      })
      .catch(error => console.log(error))
  }, [dispatch])

  return (
    <div>
      {charactersArray.map(character => (
        <CharacterImage
          key={character._id}
          src={character.image}
        />
      ))}
    </div>
  )
}

export default Gallery
