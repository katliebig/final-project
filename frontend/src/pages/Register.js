import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Form from 'components/Form'
import ImageCarousel from 'components/ImageCarousel'

const Register = () => {
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
        <Form title="Register" mode="users" />
        <ImageCarousel linkTo="login" linkText="Already have an account? Sign in here!" />
      </div>
    </section>
  )
}

export default Register