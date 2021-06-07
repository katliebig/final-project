import React from 'react';
import { useDispatch, batch } from 'react-redux'
import { Link } from 'react-router-dom'

import user from '../reducers/user'

const Home = () => {
  const dispatch = useDispatch()

  const onLogoutButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setId(null))
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))
    })
    localStorage.removeItem("user")
  }

  return (
    <>
      {/* <Link to="/Creator">
        Character Creator
      </Link> */}
      <Link to="/Login">
        Log in
      </Link>
      <button onClick={onLogoutButtonClick} className="logout-button">
        Log out
      </button>
    </>
  )
}

export default Home