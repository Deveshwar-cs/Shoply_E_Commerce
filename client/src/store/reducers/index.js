import { combineReducers } from 'redux';

import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import subCategoryReducer from './subCategoryReducer';
import productReducer from './productReducer';
import searchReducer from './searchReducer';
import cartReducer from './cartReducer';
import drawerReducer from './drawerReducer';
import couponReducer from './couponReducer';
import orderReducer from './orderReducer';
import wishlistReducer from './wishlistReducer';
import cashOnDeliveryReducer from './cashOnDeliveryReducer';

export default combineReducers({
  auth: authReducer,
  category: categoryReducer,
  sub: subCategoryReducer,
  product: productReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  order: orderReducer,
  wishlist: wishlistReducer,
  COD: cashOnDeliveryReducer,
});
