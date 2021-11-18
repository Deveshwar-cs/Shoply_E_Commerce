import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions/types';

export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product });
export const removeFromCart = (id) => ({ type: REMOVE_FROM_CART, payload: id });
export const clearCart = () => ({ type: CLEAR_CART });
