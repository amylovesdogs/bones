'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Cart from './components/Cart'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import Signup from './components/Signup'

import Layout from './components/Layout';
import Login from './components/Login';



render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <Route path="/login" component={Login}/>
        <Route path="/cart" component={Cart} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)