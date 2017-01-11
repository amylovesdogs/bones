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
import Products from './containers/ProductsContainer';

import { getProducts, getProductFromId } from './action-creators/products';

const onProductsEnter= () => {
  store.dispatch(getProducts());
};

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <Route path="/login" component={Login}/>
        <Route path="/cart" component={Cart} />
        <Route path="/products" component={Products} onEnter={onProductsEnter}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)