import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Form from 'components/Form'
import ImageCarousel from 'components/ImageCarousel'

const Login = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  return (
    <section className="main">
      <div className="login-container" >
        <Form title="Login" mode="sessions" />
        <ImageCarousel linkTo="register" linkText="Not a user yet? Sign up here!" />
      </div>
    </section>
  )
}

export default Login