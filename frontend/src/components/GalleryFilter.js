import React from "react"

const GalleryFilter = ({ setFilter, setPage }) => {
  const onFilterChange = (e) => {
    setPage(0)
    setFilter(e.target.value)
  }

  return (
    <select className="filter-select" onChange={(e) => onFilterChange(e)}>
      <option value="">All</option>
      <option value="human">Human</option>
      <option value="tiefling">Tiefling</option>
      <option value="elf">Elf</option>
    </select>
  )
}

export default GalleryFilter
