import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'

const Pagination = ({ page, setPage }) => {
  const [windowSize, setWindowSize] = useState(undefined)
  const meta = useSelector(store => store.characters.characters)

  useEffect(() => {
    setWindowSize(window.innerWidth)
  }, [])

  window.addEventListener("resize", () => setWindowSize(window.innerWidth))

  let forcePageObj = {}
  if (page === 0) {
    forcePageObj["forcePage"] = 0
  }

  const onPageChange = (currentPage) => {
    setPage(currentPage.selected)
    window.scrollTo(0, 0)
  }

  return (
    <ReactPaginate
      previousLabel={<img src="./assets/left.svg" alt="left arrow icon" className="pagination-icon" />}
      nextLabel={<img src="./assets/right.svg" alt="right arrow icon" className="pagination-icon" />}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={meta.totalPages}
      marginPagesDisplayed={1}
      pageRangeDisplayed={windowSize < 670 ? 1 : 3}
      onPageChange={(currentPage) => onPageChange(currentPage)}
      containerClassName={'pagination'}
      activeClassName={'active'}
      previousLinkClassName={"pagination-link"}
      nextLinkClassName={"pagination-link"}
      {...forcePageObj}
    />
  )
}

export default Pagination