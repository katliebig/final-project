import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import characters from '../reducers/characters'
import { API_URL } from '../reusables/urls'

import GalleryCard from './GalleryCard'
import Loader from './Loader'

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true)
  const charactersArray = useSelector(store => store.characters.characters)

  const dispatch = useDispatch()

  useEffect(() => {
    fetch(API_URL("characters"))
      .then(res => res.json())
      .then(data => {
        dispatch(characters.actions.setCharacters(data))
        setIsLoading(false)
        console.log(data)
      })
      .catch(error => console.log(error))
  }, [dispatch])

  return (
    <div className="gallery">
      {isLoading && <Loader />}
      {charactersArray.map(character => (
        <GalleryCard character={character} key={character._id} />
      ))}
    </div>
  )
}

export default Gallery
