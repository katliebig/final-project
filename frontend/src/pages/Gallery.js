import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import characters from '../reducers/characters'
import { API_URL } from '../reusables/urls'

import Pagination from 'components/Pagination'
import GalleryCard from '../components/GalleryCard'
import GalleryFilter from '../components/GalleryFilter'
import Loader from '../components/Loader'

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("")
  const [page, setPage] = useState(0)
  const charactersArray = useSelector(store => store.characters.characters.docs)

  const dispatch = useDispatch()

  useEffect(() => {
    fetch(API_URL(`characters?race=${filter}&page=${page}`))
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(characters.actions.setCharacters(data.characters))
          setIsLoading(false)
        } else {
          alert(data.message)
        }
      })
  }, [dispatch, filter, page])

  return (
    <section className="main">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <GalleryFilter setFilter={setFilter} setPage={setPage} />
          <div className="cards-container">
            {charactersArray.map(character => (
              <GalleryCard character={character} key={character._id} />
            ))}
          </div>
          <Pagination page={page} setPage={setPage} />
        </>
      )}
    </section>
  )
}

export default Gallery
