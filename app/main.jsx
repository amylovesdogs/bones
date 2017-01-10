'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'

import Layout from './components/Layout';
import Login from './components/Login';



render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <Route path="/login" component={Login}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)