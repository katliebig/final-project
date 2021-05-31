import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Creator from './components/Creator'
import Gallery from './components/Gallery'
import UserGallery from './components/UserGallery'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Login" component={Login} />
        <Route path="/Creator" component={Creator} />
        <Route path="/Gallery" component={Gallery} />
        <Route path="/UserGallery" component={UserGallery} />
      </Switch>
    </BrowserRouter>
  )
}
