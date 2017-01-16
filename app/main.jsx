'use strict'
import axios from 'axios';
import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';

import store from './store';
import {fetchSingleProduct} from './reducers/singleProduct';

import Layout from './components/Layout';
import Products from './containers/ProductsContainer';
import Login from './components/Login';
import SingleProductContainer from './containers/SingleProductContainer';

import { getProducts, getProductFromId } from './action-creators/products';

const onProductsEnter= () => {
  store.dispatch(getProducts());
};

const onSingleProductEnter = (nextState) => {
  const productId = nextState.params.productId;
  store.dispatch(fetchSingleProduct(productId));
}


render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <Route path="/login" component={Login}/>
        <Route path="/products" component={Products} onEnter={onProductsEnter}/>
        <Route path="products/:productId" component={SingleProductContainer} onEnter={onSingleProductEnter}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)