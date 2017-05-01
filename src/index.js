import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Application from './Application.js'
import Routes from './Routes.js'

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss'
import 'bootstrap-sass/assets/javascripts/bootstrap.min.js'

import './index.scss'

//import { Button } from 'react-bootstrap'

const rootEl = document.getElementById('app')
const render = Component =>
  ReactDom.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl
  )

render(Routes)
if (module.hot) {
  module.hot.accept('./Routes', () => {
    const next = require('./Routes').default
    render(next)
  })
}


/*

    <Router>
    <Route path="/" component={Application} />
    <Route path="/ojam" component={ClientApp} />
    <Route path="*" component={ClientApp} />
   
  </Router>,
    */