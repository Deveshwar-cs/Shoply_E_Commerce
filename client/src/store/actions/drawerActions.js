import { SET_CART_DRAWER_VISABILITY } from '../actions/types';

export const setDrawerVisability = (boolValue) => ({
  type: SET_CART_DRAWER_VISABILITY,
  payload: boolValue,
});
