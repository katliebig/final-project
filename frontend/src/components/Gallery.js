import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import characters from '../reducers/characters'
import { API_URL } from '../reusables/urls'

import GalleryCard from './GalleryCard'
import GalleryFilter from './GalleryFilter';
import Loader from './Loader'

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("")
  const charactersArray = useSelector(store => store.characters.characters)

  const dispatch = useDispatch()

  useEffect(() => {
    fetch(API_URL(`characters?race=${filter}`))
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(characters.actions.setCharacters(data.characters))
          setIsLoading(false)
        } else {
          alert(data.message)
        }
      })
  }, [dispatch, filter])

  return (
    <section className="main">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <GalleryFilter setFilter={setFilter} />
          <div className="cards-container">
            {charactersArray.map(character => (
              <GalleryCard character={character} key={character._id} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default Gallery
