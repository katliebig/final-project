import React, {useState, useRef} from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Race from 'components/Race'
import Creator from './components/Creator'
import Gallery from './components/Gallery'
import UserGallery from './components/UserGallery'
import Header from "./components/Header"
import Burger from './components/Burger';
import Menu from './components/Menu'

import user from './reducers/user'
import race from './reducers/race'
import characters from './reducers/characters'

import { useOnClickOutside } from 'reusables/hooks'

const reducer = combineReducers({
  user: user.reducer,
  race: race.reducer,
  characters: characters.reducer
})
const store = configureStore({ reducer })

export const App = () => {
  const [open, setOpen] = useState(false)
  const node = useRef(); 
  useOnClickOutside(node, () => setOpen(false));

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
          <Route path="/Login" component={Login} />
          <Route path="/Creator" component={Creator} />
          <Route path="/Race" component={Race} />
          <Route path="/Gallery" component={Gallery} />
          <Route path="/UserGallery" component={UserGallery} />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
