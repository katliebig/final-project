import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"

import user from '../reducers/user'

import { API_URL } from '../reusables/urls'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null)

  const accessToken = useSelector(store => store.user.accessToken)
  const errors = useSelector(store => store.user.errors)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  const onFormSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }
    fetch(API_URL(mode), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setId(data.id))
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
          })
          localStorage.setItem("user", JSON.stringify({
            id: data.id,
            username: data.username,
            accessToken: data.accessToken
          }))
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
      .catch()
  }
  let errorMessage

  if (errors) {
    if (errors.error) {
      if (errors.error.code === 11000) {
        errorMessage = "Username already taken"
      } else if (errors.error.name === "ValidationError") {
        errorMessage = "Username must be between 4 and 20 characters long"
      }
    } else {
      errorMessage = errors.message
    }
  }

  return (
    <section className="main">
      <div className="login-container" >
        <form onSubmit={onFormSubmit} className="login-form">
          <label htmlFor="username">
            Username
          </label>
          <input
            type="text"
            value={username}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">
            Password (min. 8 characters)
          </label>
          <input
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="login-error-message">{errorMessage}</p>
          <button
            type="submit"
            onClick={() => setMode('sessions')}
          >Sign in</button>
          <button
            type="submit"
            onClick={() => setMode('users')}
            disabled={password.length < 8 ? true : false}
          >Sign up</button>
        </form>
        <Carousel
          className="login-image-container"
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
          showArrows={false}
          swipeable={false}
          autoPlay={true}
          infiniteLoop={true}
          interval={4000}
        >
          <img id="login-image" src="./assets/elf.png" alt="elf" />
          <img id="login-image" src="./assets/tiefling.png" alt="tiefling" />
          <img id="login-image" src="./assets/human.png" alt="human" />
          <img id="login-image" src="./assets/dwarf.png" alt="dwarf" />
          <img id="login-image" src="./assets/human1.png" alt="human" />
          <img id="login-image" src="./assets/tiefling1.png" alt="tiefling" />
        </Carousel>
      </div>
    </section>
  )
}

export default Login