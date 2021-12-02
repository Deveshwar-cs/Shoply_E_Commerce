import { notification } from 'antd';
import * as actionTypes from '../actions/types';

import { createUserCart } from '../../functions/userFunctions';

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

// Create cart actions

const createCartRequest = () => ({ type: actionTypes.CREATE_CART_REQUEST });
const createCartSuccess = () => ({
  type: actionTypes.CREATE_CART_SUCCESS,
});
const createCartError = (e) => ({
  type: actionTypes.CREATE_CART_ERROR,
  payload: e,
});

export const createCartAction = (cart, token) => async (dispatch) => {
  try {
    dispatch(createCartRequest());
    // Request to DB
    const response = await createUserCart(cart, token);
    if (response.data.ok) {
      dispatch(createCartSuccess());
      notification.success({
        message: `Product cart added to user history!`,
      });
    }
  } catch (error) {
    dispatch(createCartError(error));
    notification.error({
      message: `Product cart save error!`,
    });
    console.log('createCartAction error', error);
  }
};
