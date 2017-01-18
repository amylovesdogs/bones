'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store';
import {fetchSingleProduct} from './reducers/singleProduct';

import Layout from './components/Layout';
import Cart from './components/Cart'
import Products from './containers/ProductsContainer';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Success from './components/Success';
import SingleProductContainer from './containers/SingleProductContainer';

import { getCategories } from './reducers/categories';
import { getProducts, getProductsByCategoryId, getProductFromId } from './action-creators/products';

const onEnter = () => {
  store.dispatch(getCategories());
};

const onProductsEnter = () => {
  store.dispatch(getProducts());
}

const onProductsByCategoryEnter = (nextState) => {
  const categoryId = nextState.params.categoryId;
  store.dispatch(getProductsByCategoryId(categoryId));
}

const onSingleProductEnter = (nextState) => {
  const productId = nextState.params.productId;
  store.dispatch(fetchSingleProduct(productId));
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout} onEnter={onEnter}>
        <Route path="/login" component={Login}/>
        <Route path="/cart" component={Cart} />
        <Route path="/products" component={Products} onEnter={onProductsEnter}/>
        <Route path="/products/categories/:categoryId" component={Products} onEnter={onProductsByCategoryEnter}/>
        <Route path="/products/:productId" component={SingleProductContainer} onEnter={onSingleProductEnter}/>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/checkout/success" component={Success}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)