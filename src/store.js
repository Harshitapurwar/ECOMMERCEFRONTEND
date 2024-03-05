import React from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { productsDetailsReducer, productsReducer } from './reducers/productReducer';
import { profileReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';

const reducer = combineReducers({
  products: productsReducer,
  productsDetails:productsDetailsReducer,
  user:userReducer,
  profile:profileReducer,
  cart:cartReducer
});
let initialState = {
  cart:{
    cartItems:localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
