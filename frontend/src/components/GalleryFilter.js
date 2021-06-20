import React from "react"

const GalleryFilter = ({ setFilter }) => {
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
