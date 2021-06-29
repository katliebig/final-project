import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ReactPaginate from 'react-paginate';

import characters from '../reducers/characters'
import { API_URL } from '../reusables/urls'

import GalleryCard from '../components/GalleryCard'
import GalleryFilter from '../components/GalleryFilter';
import Loader from '../components/Loader'

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("")
  const [page, setPage] = useState(0)
  const charactersArray = useSelector(store => store.characters.characters.docs)
  const meta = useSelector(store => store.characters.characters)

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
      {meta && <ReactPaginate
        previousLabel={<img src="./assets/left.svg" alt="left arrow icon" className="pagination-icon" />}
        nextLabel={<img src="./assets/right.svg" alt="right arrow icon" className="pagination-icon" />}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={meta.totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={(currentPage) => setPage(currentPage.selected)}
        containerClassName={'pagination'}
        activeClassName={'active'}
        previousLinkClassName={"pagination-link"}
        nextLinkClassName={"pagination-link"}
      />}
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <GalleryFilter setFilter={setFilter} setPage={setPage} />
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
