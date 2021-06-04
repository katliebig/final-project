import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Creator from './components/Creator'
import Gallery from './components/Gallery'
import UserGallery from './components/UserGallery'

import user from './reducers/user'
import raceImageSet from 'reducers/raceImageSet'

const reducer = combineReducers({
  user: user.reducer,
  raceImageSet: raceImageSet.reducer
})
const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Login" component={Login} />
          <Route path="/Creator" component={Creator} />
          <Route path="/Gallery" component={Gallery} />
          <Route path="/UserGallery" component={UserGallery} />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
