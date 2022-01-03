import * as actionTypes from '../actions/types';

export const setCartDrawerVisability = (boolValue) => ({
  type: actionTypes.SET_CART_DRAWER_VISABILITY,
  payload: boolValue,
});

export const setMobileDrawerVisability = (boolValue) => ({
  type: actionTypes.SET_MOBILE_DRAWER_VISABILITY,
  payload: boolValue,
});
