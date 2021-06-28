import React from "react"
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="main">
      <h2>404 - Here there be monsters</h2>
      <Link to="/" className="redirect-link link">You'd better head back home!</Link>
    </section>
  )
}

export default NotFound