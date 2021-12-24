import { notification } from 'antd';
import * as actionTypes from '../actions/types';

import {
  getWishlist,
  removeProductFromWishlist,
  addProductToWishlist,
} from '../../functions/userFunctions';

// Get wishlist

const getWishlistRequest = () => ({
  type: actionTypes.GET_WISHLIST_REQUEST,
});
const getWishlistSuccess = (wishlist) => ({
  type: actionTypes.GET_WISHLIST_SUCCESS,
  payload: wishlist,
});
const getWishlistError = (e) => ({
  type: actionTypes.GET_WISHLIST_ERROR,
  payload: e,
});

export const getWishlistAction = (token) => async (dispatch) => {
  try {
    dispatch(getWishlistRequest());

    // Request to DB
    const response = await getWishlist(token);

    dispatch(getWishlistSuccess(response.data.wishlist));
  } catch (error) {
    dispatch(getWishlistError(error));
  }
};

// Add product to wishlist

const addProductToWishlistRequest = () => ({
  type: actionTypes.ADD_TO_WISHLIST_REQUEST,
});
const addProductToWishlistSuccess = () => ({
  type: actionTypes.ADD_TO_WISHLIST_SUCCESS,
});
const addProductToWishlistError = (e) => ({
  type: actionTypes.ADD_TO_WISHLIST_ERROR,
  payload: e,
});

export const addProductToWishlistAction =
  (productId, token) => async (dispatch) => {
    try {
      dispatch(addProductToWishlistRequest());

      // Request to DB
      const response = await addProductToWishlist(productId, token);
      if (response.data.productAddedToWishlist) {
        dispatch(addProductToWishlistSuccess());
        notification.success({
          message: `Product added to wishlist!!`,
        });
      }
    } catch (error) {
      dispatch(addProductToWishlistError(error));
    }
  };

// Delete product from wishlist

const deleteProductFromWishlistRequest = () => ({
  type: actionTypes.DELETE_FROM_WISHLIST_REQUEST,
});
const deleteProductFromWishlistSuccess = () => ({
  type: actionTypes.DELETE_FROM_WISHLIST_SUCCESS,
});
const deleteProductFromWishlistError = (e) => ({
  type: actionTypes.DELETE_FROM_WISHLIST_ERROR,
  payload: e,
});

export const deleteProductFromWishlistAction =
  (productId, token) => async (dispatch) => {
    try {
      dispatch(deleteProductFromWishlistRequest());

      // Request to DB
      const response = await removeProductFromWishlist(productId, token);
      if (response.data.productDeletedFromWishlist) {
        dispatch(deleteProductFromWishlistSuccess());
        dispatch(getWishlistAction(token));
      }
    } catch (error) {
      dispatch(deleteProductFromWishlistError(error));
    }
  };
