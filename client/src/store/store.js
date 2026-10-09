import { createStore, applyMiddleware, compose } from 'redux';
import { withExtraArgument } from 'redux-thunk';

import rootReducer from './reducers';
import { auth } from '../firebase';

const initialState = {};

const middlewares = [withExtraArgument(auth)];

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middlewares))
);

export default store;
