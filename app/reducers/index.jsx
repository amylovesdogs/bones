import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  // OB/DYS: can also use import blah from './blah'
  auth: require('./auth').default,
  cart: require('./cart').default,
  products: require('./products').default,
  singleProduct: require('./singleProduct').default,
  categories: require('./categories').default
})

export default rootReducer
