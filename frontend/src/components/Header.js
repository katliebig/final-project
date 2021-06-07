import React from "react"
import { useSelector, useDispatch, batch } from 'react-redux'
import { Link } from 'react-router-dom'

import user from '../reducers/user'

const Header = () => {
  const accessToken = useSelector(store => store.user.accessToken)

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
    <header>
      {accessToken &&
        <button onClick={onLogoutButtonClick} className="logout-button">
          Log out
      </button>}

      <Link to="/">Home</Link>

      {!accessToken && <Link to="/Login">Log in</Link>}

      {accessToken && <Link to="/Creator">Creator</Link>}

      <Link to="/Gallery">Gallery</Link>

      {accessToken && <Link to="/UserGallery">User Gallery</Link>}
    </header>
  )
}

export default Header