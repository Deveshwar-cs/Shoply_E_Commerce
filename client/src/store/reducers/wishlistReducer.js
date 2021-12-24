import * as actionTypes from '../actions/types';

const initialState = {
  addToWishlistInProgress: false,
  addToWishlistError: null,

  getWishlistInProgress: false,
  getWishlistError: null,

  deleteFromWishlistInProgress: false,
  deleteFromWishlistError: null,

  wishlist: [],
};

export const orderReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ADD_TO_WISHLIST_REQUEST:
      return {
        ...state,
        addToWishlistInProgress: true,
      };
    case actionTypes.ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        addToWishlistInProgress: false,
      };
    case actionTypes.ADD_TO_WISHLIST_ERROR:
      return {
        ...state,
        addToWishlistInProgress: false,
        addToWishlistError: payload,
      };

    case actionTypes.GET_WISHLIST_REQUEST:
      return {
        ...state,
        getWishlistInProgress: true,
      };
    case actionTypes.GET_WISHLIST_SUCCESS:
      return {
        ...state,
        getWishlistInProgress: false,
        wishlist: payload,
      };
    case actionTypes.GET_WISHLIST_ERROR:
      return {
        ...state,
        getWishlistInProgress: false,
        getWishlistError: payload,
      };

    case actionTypes.DELETE_FROM_WISHLIST_REQUEST:
      return {
        ...state,
        deleteFromWishlistInProgress: true,
      };
    case actionTypes.DELETE_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        deleteFromWishlistInProgress: false,
      };
    case actionTypes.DELETE_FROM_WISHLIST_ERROR:
      return {
        ...state,
        deleteFromWishlistInProgress: false,
        deleteFromWishlistError: payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
