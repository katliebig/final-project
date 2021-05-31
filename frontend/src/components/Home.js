import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <Link to="/Creator">
        Character Creator
      </Link>
      <Link to="/Login">
        Log in
      </Link>
    </>
  )
}

export default Home