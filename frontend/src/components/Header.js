import React from "react"
import { useSelector, useDispatch, batch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import user from '../reducers/user'

const Header = () => {
  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()
  const location = useLocation()

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
      <div className="background-color-header">
        <h1 className="header-title">CHARACTER CREATOR</h1>
        <div className="header-links-container">
          <Link to="/">
            <div className="header-icon-border">
              <img src="./assets/home.svg" className="header-icon" alt="home icon" />
            </div>
            <span className={`link ${location.pathname === "/" ? "current-route" : ""}`}>Home</span>
          </Link>

          {accessToken &&
            <Link to="/Race">
              <div className="header-icon-border">
                <img src="./assets/race.svg" className="header-icon" alt="race icon" />
              </div>
              <span className={`link ${location.pathname === "/Race" ? "current-route" : ""}`}>Races</span>
            </Link>
          }

          <Link to="/Creator">
            <div className="header-icon-border">
              <img src="./assets/creator.svg" className="header-icon" alt="creator icon" />
            </div>
            <span className={`link ${location.pathname === "/Creator" ? "current-route" : ""}`}>Creator</span>
          </Link>

          <Link to="/Gallery">
            <div className="header-icon-border">
              <img src="./assets/gallery.svg" className="header-icon" alt="gallery icon" />
            </div>
            <span className={`link ${location.pathname === "/Gallery" ? "current-route" : ""}`}>Gallery</span>
          </Link>

          {accessToken &&
            <Link to="/UserGallery">
              <div className="header-icon-border">
                <img src="./assets/user.svg" className="header-icon" alt="user gallery icon" />
              </div>
              <span className={`link ${location.pathname === "/UserGallery" ? "current-route" : ""}`}>User Gallery</span>
            </Link>
          }

          {!accessToken &&
            <Link to="/Login">
              <div className="header-icon-border"><img src="./assets/login.svg" className="header-icon" alt="login icon" /></div>
              <span className="link">Log in</span>
            </Link>
          }

          {accessToken &&
            <Link to="/" onClick={onLogoutButtonClick} className="logout-button">
              <div className="header-icon-border">
                <img src="./assets/logout.svg" className="header-icon" alt="logout icon" />
              </div>
              <span className="link">Log out</span>
            </Link>
          }
        </div>
      </div>
    </header >
  )
}

export default Header