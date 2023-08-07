import { createStore, applyMiddleware, compose } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import { auth } from '../firebase';

const initialState = {};

const middlewares = [thunk.withExtraArgument(auth)];

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middlewares), 
        //  composeWithDevTools()
         )
);

export default store;
