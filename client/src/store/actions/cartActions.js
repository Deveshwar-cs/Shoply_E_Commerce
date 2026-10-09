import { notification } from 'antd';
import * as actionTypes from '../actions/types';

import {
  createUserCart,
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  getUserAddress,
  applyCouponToUserCart,
  removeProductFromUserCart,
  updateProductCartQuantity,
} from '../../functions/userFunctions';

// Create cart actions
const createCartRequest = () => ({ type: actionTypes.CREATE_CART_REQUEST });
const createCartSuccess = () => ({
  type: actionTypes.CREATE_CART_SUCCESS,
});
const createCartError = (e) => ({
  type: actionTypes.CREATE_CART_ERROR,
  payload: e,
});

// Get cart actions
const getCartRequest = () => ({ type: actionTypes.GET_CART_REQUEST });
const getCartSuccess = (cart) => ({
  type: actionTypes.GET_CART_SUCCESS,
  payload: cart,
});
const getCartError = (e) => ({
  type: actionTypes.GET_CART_ERROR,
  payload: e,
});

// Empty user cart on DB actions
const emptyCartRequest = () => ({ type: actionTypes.EMPTY_CART_REQUEST });
const emptyCartSuccess = () => ({
  type: actionTypes.EMPTY_CART_SUCCESS,
});
const emptyCartError = (e) => ({
  type: actionTypes.EMPTY_CART_ERROR,
  payload: e,
});

// Save user address on Checkout page

const saveUserAddressRequest = () => ({
  type: actionTypes.SAVE_USER_ADDRESS_REQUEST,
});
const saveUserAddressSuccess = () => ({
  type: actionTypes.SAVE_USER_ADDRESS_SUCCESS,
});
const saveUserAddressError = (e) => ({
  type: actionTypes.SAVE_USER_ADDRESS_ERROR,
  payload: e,
});

// Get cart actions
const getShippingAddressRequest = () => ({
  type: actionTypes.GET_USER_ADDRESS_REQUEST,
});
const getShippingAddressSuccess = (address) => ({
  type: actionTypes.GET_USER_ADDRESS_SUCCESS,
  payload: address,
});
const getShippingAddressError = (e) => ({
  type: actionTypes.GET_USER_ADDRESS_ERROR,
  payload: e,
});

// Apply coupon to user cart actions

const applyCouponRequest = () => ({
  type: actionTypes.APPLY_COUPON_TO_CART_REQUEST,
});
const applyCouponSuccess = () => ({
  type: actionTypes.APPLY_COUPON_TO_CART_SUCCESS,
});
const applyCouponFailure = () => ({
  type: actionTypes.APPLY_COUPON_TO_CART_FAILURE,
});
const applyCouponError = (e) => ({
  type: actionTypes.APPLY_COUPON_TO_CART_ERROR,
  payload: e,
});

export const getShippingAddressAction = (token) => async (dispatch) => {
  try {
    dispatch(getShippingAddressRequest());

    // Request to DB
    const response = await getUserAddress(token);

    // if the shipping address for the user is not set yet, we dispatch empty string
    if (response.data.userAddressNotSet)
      return dispatch(getShippingAddressSuccess(''));

    dispatch(getShippingAddressSuccess(response.data.address));
  } catch (error) {
    dispatch(getShippingAddressError(error));
  }
};

export const applyCouponAction = (couponName, token) => async (dispatch) => {
  try {
    dispatch(applyCouponRequest());

    // Request to DB
    const response = await applyCouponToUserCart(couponName, token);

    if (response.data.invalidCoupon) {
      dispatch(applyCouponFailure());
      notification.error({
        message: `Invalid coupon!`,
      });
    }
    if (response.data.couponExpired) {
      dispatch(applyCouponFailure());
      notification.error({
        message: `Coupon expired!`,
      });
    }
    if (response.data.discountAppliedSuccess) {
      dispatch(applyCouponSuccess());
      dispatch(getCartAction(token));
      notification.success({
        message: `Coupon successfully applied!`,
      });
    }
  } catch (error) {
    dispatch(applyCouponError(error));
    notification.error({
      message: `Apply coupon error!`,
      description: error.message,
    });
  }
};

export const emptyCartInDBAction = (token) => async (dispatch) => {
  try {
    dispatch(emptyCartRequest());

    const response = await emptyUserCart(token);

    dispatch(emptyCartSuccess());

    notification.success({
      message: `Cart is empty now. You can continue shopping!`,
    });

    return response;
  } catch (error) {
    dispatch(emptyCartError(error));

    notification.error({
      message: 'Unable to empty cart!',
    });

    throw error;
  }
};

export const saveUserAddressAction = (address, token) => async (dispatch) => {
  try {
    dispatch(saveUserAddressRequest());
    // Request to DB
    const response = await saveUserAddress(address, token);
    if (response.data.addressSaved) {
      dispatch(saveUserAddressSuccess());
      notification.success({
        message: `Shipping address saved!`,
      });
    }
  } catch (error) {
    dispatch(saveUserAddressError(error));
    notification.error({
      message: `Shipping address save error!`,
    });
    console.log('saveUserAddressAction error', error);
  }
};

export const createCartAction = (cart, token) => async (dispatch) => {
  try {
    dispatch(createCartRequest());

    const response = await createUserCart(cart, token);

    if (response.data.ok) {
      dispatch(createCartSuccess());

      notification.success({
        message: 'Product cart saved to user history!',
      });
    }

    return response.data;
  } catch (error) {
    dispatch(createCartError(error));

    notification.error({
      message: 'Product cart save error!',
      description: error.message,
    });

    console.log('createCartAction error', error);

    throw error;
  }
};

export const getCartAction = (token) => async (dispatch) => {
  try {
    dispatch(getCartRequest());

    const response = await getUserCart(token);

    if (response.data.cartIsEmpty) {
      dispatch(
        getCartSuccess({
          products: [],
          totalPrice: 0,
          totalPriceAfterDiscount: 0,
        })
      );

      dispatch({
        type: actionTypes.SET_CART,
        payload: {
          items: [],
          totalQuantity: 0,
          totalPrice: 0,
        },
      });

      return response.data;
    }
    console.log('RESPONSE DATA:=======', response.data);
    const { products, totalPrice } = response.data;

    const items = products.map((item) => ({
      ...item.product,
      cartQuantity: item.quantity,
    }));

    const totalQuantity = products.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const reduxCart = {
      items,
      totalQuantity,
      totalPrice,
    };

    // keep database cart information
    dispatch(getCartSuccess(response.data));

    // Make database cart the active Redux cart
    dispatch({
      type: actionTypes.SET_CART,
      payload: reduxCart,
    });

    return response.data;
  } catch (error) {
    dispatch(getCartError(error));
  }
};

export const updateProductCartQuantityAction =
  (productId, quantity, token) => async (dispatch) => {
    try {
      await updateProductCartQuantity(productId, quantity, token);
      dispatch(
        setItemQuantity({
          quantity,
          id: productId,
        })
      );
    } catch (error) {
      console.log('UPDATE PRODUCT QUANTITY ERROR', error);

      notification.error({
        message: 'Unable to update product quantity',
      });
    }
  };

export const removeProductFromCartDB =
  (productId, token) => async (dispatch) => {
    try {
      await removeProductFromUserCart(productId, token);
      dispatch(removeFromCart(productId));
    } catch (error) {
      console.log('REMOVE PRODUCT FROM CART ERROR', error);
      notification.error({ messsage: 'Unable to remove product from cart' });
    }
  };

export const setItemQuantity = ({ quantity, id }) => ({
  type: actionTypes.SET_ITEM_QUANTITY,
  payload: { quantity, id },
});

export const addToCart = (product) => ({
  type: actionTypes.ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (id) => ({
  type: actionTypes.REMOVE_FROM_CART,
  payload: { id },
});

// Clear cart in localStorage
export const clearCart = () => ({ type: actionTypes.CLEAR_CART });
