import { RECEIVE_PRODUCTS, RECEIVE_PRODUCT } from '../constants';
import axios from 'axios';

export const receiveProducts = products => ({
    type: RECEIVE_PRODUCTS,
    products
});

export const getProducts = (categoryId) => {
  return dispatch => {
    if (!categoryId) {
      axios.get('/api/products')
      .then(response => {
        console.log("got back: ", response.data);
        dispatch(receiveProducts(response.data));
      });
    } else {
      axios.get('/api/products/categories/'+categoryId)
      .then(response => {
        console.log("got back: ", response.data);
        dispatch(receiveProducts(response.data));
      });
    }
  };
};

export const getProductById = productId => {
  return dispatch => {
    axios.get(`/api/products/${productId}`)
      .then(response => {
        dispatch(receiveProduct(response.data));
      });
  };
};