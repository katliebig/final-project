import React from 'react';
import { useSelector, useDispatch, batch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';

import { StyledMenu } from './Menu.styled';

import user from '../reducers/user'

const Menu = ({ open }) => {
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
    <StyledMenu open={open}>
      <div className="burger-menu-links-container">
          <Link to="/">
            <div className="link-container">
              <div className="burger-menu-icon-border">
                <img src="./assets/home.svg" className="header-icon" alt="home icon" />
              </div>
              <span className={`link ${location.pathname === "/" ? "current-route" : ""}`}>Home</span>
            </div>
          </Link>

          {accessToken &&
            <Link to="/Race">
              <div className="link-container">
                <div className="burger-menu-icon-border">
                  <img src="./assets/race.svg" className="header-icon" alt="race icon" />
                </div>
                <span className={`link ${location.pathname === "/Race" ? "current-route" : ""}`}>Races</span>
              </div>
            </Link>
          }

          {accessToken &&
            <Link to="/Creator">
              <div className="link-container">
                <div className="burger-menu-icon-border">
                  <img src="./assets/creator.svg" className="header-icon" alt="home icon" />
                </div>
                <span className={`link ${location.pathname === "/Creator" ? "current-route" : ""}`}>Creator</span>
              </div>
            </Link>
          }

          <Link to="/Gallery">
            <div className="link-container">
              <div className="burger-menu-icon-border">
                <img src="./assets/gallery.svg" className="header-icon" alt="home icon" />
              </div>
              <span className={`link ${location.pathname === "/Gallery" ? "current-route" : ""}`}>Gallery</span>
            </div>
          </Link>

          {accessToken &&
            <Link to="/UserGallery">
              <div className="link-container">
                <div className="burger-menu-icon-border">
                  <img src="./assets/user.svg" className="header-icon" alt="home icon" />
                </div>
                <span className={`link ${location.pathname === "/UserGallery" ? "current-route" : ""}`}>User Gallery</span>
              </div>
            </Link>
          }

          {!accessToken &&
            <Link to="/Login">
              <div className="link-container">
                <div className="burger-menu-icon-border"><img src="./assets/login.svg" className="header-icon" alt="home icon" /></div>
                <span className="link">Log in</span>
              </div>
            </Link>
          }

          {accessToken &&
            <Link to="/" onClick={onLogoutButtonClick} className="logout-button">
              <div className="link-container">
                <div className="burger-menu-icon-border">
                  <img src="./assets/logout.svg" className="header-icon" alt="home icon" />
                </div>
                <span className="link">Log out</span>
              </div>
            </Link>
          }
        </div>
    </StyledMenu>
  )
}
export default Menu;