import { combineReducers } from 'redux';

import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import subCategoryReducer from './subCategoryReducer';
import productReducer from './productReducer';

export default combineReducers({
  auth: authReducer,
  category: categoryReducer,
  sub: subCategoryReducer,
  product: productReducer,
});
