import React, { useState } from 'react'
import { useDispatch, batch } from 'react-redux'

import user from '../reducers/user'

import { API_URL } from '../reusables/urls'

const Form = ({ title, mode }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const dispatch = useDispatch()

  const onFormSubmit = (e) => {
    e.preventDefault()

    if (mode === "users" && password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long")
    } else {
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
            setErrorMessage(handleErrors(data))
          }
        })
    }
  }

  const handleErrors = (errors) => {
    let error
    if (errors.error) {
      if (errors.error.code === 11000) {
        error = "Username already taken"
      } else if (errors.error.name === "ValidationError") {
        error = "Username must be between 4 and 16 characters long"
      }
    } else {
      error = errors.message
    }
    return error
  }

  return (
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
        Password
      </label>
      <input
        type="password"
        value={password}
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className="login-error-message">{errorMessage}</p>
      <button type="submit">{title}</button>
    </form>
  )
}

export default Form