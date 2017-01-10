'use strict'
import axios from 'axios';
import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';

import store from './store';
import Products from './containers/ProductsContainer';
import Login from './components/Login';
import WhoAmI from './components/WhoAmI';
import Signup from './components/Signup';

import { getProducts, getProductFromId } from './action-creators/products';

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
        <Signup/>
      </nav>
      {children}
    </div>
)

const onProductsEnter = function (nextRouterState) {
  console.log("params are: ", nextRouterState.params);
  let products = nextRouterState.params.products;
  store.dispatch(getProducts(products));
};


render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/products" />
        <Route path="/products" component={Products} onEnter={onProductsEnter}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)