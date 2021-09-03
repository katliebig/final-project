import React, { useState, useRef } from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from 'pages/Register'
import Race from 'pages/Race'
import Creator from './pages/Creator'
import Gallery from './pages/Gallery'
import UserGallery from './pages/UserGallery'
import NotFound from 'pages/NotFound'
import Header from "./components/Header"
import Burger from './components/Burger'
import Menu from './components/Menu'

import user from './reducers/user'
import race from './reducers/race'
import characters from './reducers/characters'
import currentCharacter from './reducers/currentCharacter'

import { useOnClickOutside } from 'reusables/hooks'

const reducer = combineReducers({
  user: user.reducer,
  race: race.reducer,
  characters: characters.reducer,
  currentCharacter: currentCharacter.reducer
})
const store = configureStore({ reducer })

export const App = () => {
  const [open, setOpen] = useState(false)
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false))

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div ref={node}>
          <Burger
            open={open}
            setOpen={setOpen}
          />
          <Menu
            open={open}
            setOpen={setOpen}
          />
        </div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/creator" component={Creator} />
          <Route path="/race" component={Race} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/usergallery" component={UserGallery} exact />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
