import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Application from './Application.js'

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

render(Application)
if (module.hot) {
  module.hot.accept('./Application', () => {
    const next = require('./Application').default
    render(next)
  })
}
