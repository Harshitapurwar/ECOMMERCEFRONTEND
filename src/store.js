import React from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { productsDetailsReducer, productsReducer } from './reducers/productReducer';
import { userReducer } from './reducers/userReducer';

const reducer = combineReducers({
  products: productsReducer,
  productsDetails:productsDetailsReducer,
  user:userReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
