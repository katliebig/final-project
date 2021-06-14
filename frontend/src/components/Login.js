import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

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
      history.push('/Creator')
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
        console.log(data)
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

  return (
    <section>
      <form onSubmit={onFormSubmit}>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password (min. 8 characters)
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          onClick={() => setMode('sessions')}
        >Sign in</button>
        <button
          type="submit"
          onClick={() => setMode('users')}
          disabled={password.length <= 8 ? true : false}
        >Sign up</button>
      </form>
      {(errors && errors.error.code === 11000) && <p>Username already taken</p>}
      {(errors && errors.error.name === "ValidationError") && <p>Username must be between 4 and 20 characters long.</p>}
    </section>
  )
}

export default Login