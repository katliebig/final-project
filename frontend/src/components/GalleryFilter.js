import React, { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'

import characters from '../reducers/characters'
import { API_URL } from '../reusables/urls'

const GalleryFilter = () => {
  const [filter, setFilter] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    fetch(API_URL(`characters?race=${filter}`))
      .then(res => res.json())
      .then(data => {
        dispatch(characters.actions.setCharacters(data))
      })
      .catch(error => console.log(error))
  }, [dispatch, filter])

  return (
    <select className="filter-select" onChange={(e) => setFilter(e.target.value)}>
      <option value="">All</option>
      <option value="human">Human</option>
      <option value="tiefling">Tiefling</option>
      <option value="elf">Elf</option>
    </select>
  )
}

export default GalleryFilter
