import * as actionTypes from '../actions/types';

export const addToCart = (product) => ({
  type: actionTypes.ADD_TO_CART,
  payload: product,
});
export const removeFromCart = (id) => ({
  type: actionTypes.REMOVE_FROM_CART,
  payload: { id },
});
export const clearCart = () => ({ type: actionTypes.CLEAR_CART });
export const setItemQuantity = ({ quantity, id }) => ({
  type: actionTypes.SET_ITEM_QUANTITY,
  payload: { quantity, id },
});
