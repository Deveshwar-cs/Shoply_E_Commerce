import { notification } from 'antd';
import * as actionTypes from '../actions/types';

import {
  createUserOrder,
  getAllOrdersByUser,
  createUserOrderWithCashPayment,
} from '../../functions/userFunctions';

import {
  getAllOrdersByAdmin,
  updateOrderStatus,
} from '../../functions/adminFunctions';
import { emptyCartInDBAction, clearCart } from '../actions/cartActions';

// Create order actions

const createOrderRequest = () => ({ type: actionTypes.CREATE_ORDER_REQUEST });
const createOrderSuccess = () => ({
  type: actionTypes.CREATE_ORDER_SUCCESS,
});
const createOrderError = (e) => ({
  type: actionTypes.CREATE_ORDER_ERROR,
  payload: e,
});

export const createOrderAction =
  (stripeResponse, token) => async (dispatch) => {
    try {
      dispatch(createOrderRequest());
      // Request to DB
      const response = await createUserOrder(stripeResponse, token);
      if (response.data.orderCreated) {
        dispatch(emptyCartInDBAction(token)); // delete user cart in DB
        dispatch(clearCart()); // delete user cart from Redux store/localStorage
        dispatch(createOrderSuccess());
        notification.success({
          message: `'Order successfully created!`,
        });
      }
    } catch (error) {
      dispatch(createOrderError(error));
      notification.error({
        message: `Order create error!`,
      });
      console.log('createOrderAction error', error);
    }
  };

//
// Create order with cash payment actions

const createOrderCashPaymentRequest = () => ({
  type: actionTypes.CREATE_ORDER_CASH_PAYMENT_REQUEST,
});
const createOrderCashPaymentSuccess = () => ({
  type: actionTypes.CREATE_ORDER_CASH_PAYMENT_SUCCESS,
});
const createOrderCashPaymentError = (e) => ({
  type: actionTypes.CREATE_ORDER_CASH_PAYMENT_ERROR,
  payload: e,
});

export const createOrderCashPaymentAction =
  (cashOnDelivery, token) => async (dispatch) => {
    try {
      dispatch(createOrderCashPaymentRequest());
      // Request to DB
      const response = await createUserOrderWithCashPayment(
        cashOnDelivery,
        token
      );
      if (!response.data.orderCreated) {
        notification.error({
          message: `Create order with cash payment failed!`,
        });
      }
      if (response.data.orderCreated) {
        dispatch(emptyCartInDBAction(token)); // delete user cart in DB
        dispatch(clearCart()); // delete user cart from Redux store/localStorage
        dispatch(createOrderCashPaymentSuccess());
        notification.success({
          message: `'Order successfully created!`,
        });
      }
    } catch (error) {
      dispatch(createOrderCashPaymentError(error));
      notification.error({
        message: `Create order with cash payment error!`,
      });
      console.log('createOrderCashPaymentAction error', error);
    }
  };

// Get all orders by user

const getAllOrdersByUserRequest = () => ({
  type: actionTypes.GET_ALL_ORDERS_BY_USER_REQUEST,
});
const getAllOrdersByUserSuccess = (orders) => ({
  type: actionTypes.GET_ALL_ORDERS_BY_USER_SUCCESS,
  payload: orders,
});
const getAllOrdersByUserError = (e) => ({
  type: actionTypes.GET_ALL_ORDERS_BY_USER_ERROR,
  payload: e,
});

export const getAllOrdersByUserAction = (token) => async (dispatch) => {
  try {
    dispatch(getAllOrdersByUserRequest());
    // Request to DB
    const allOrdersByUser = await getAllOrdersByUser(token);

    dispatch(getAllOrdersByUserSuccess(allOrdersByUser.data));
  } catch (error) {
    dispatch(getAllOrdersByUserError());
  }
};

// Get all orders by admin

const getAllOrdersByAdminRequest = () => ({
  type: actionTypes.GET_ALL_ORDERS_BY_ADMIN_REQUEST,
});
const getAllOrdersByAdminSuccess = (orders) => ({
  type: actionTypes.GET_ALL_ORDERS_BY_ADMIN_SUCCESS,
  payload: orders,
});
const getAllOrdersByAdminError = (e) => ({
  type: actionTypes.GET_ALL_ORDERS_BY_ADMIN_ERROR,
  payload: e,
});

export const getAllOrdersByAdminAction = (token) => async (dispatch) => {
  try {
    dispatch(getAllOrdersByAdminRequest());
    // Request to DB
    const allOrdersByAdmin = await getAllOrdersByAdmin(token);

    dispatch(getAllOrdersByAdminSuccess(allOrdersByAdmin.data));
  } catch (error) {
    dispatch(getAllOrdersByAdminError());
  }
};

// Update orders status by admin

const updateOrderStatusByAdminRequest = () => ({
  type: actionTypes.UPDATE_ORDER_STATUS_REQUEST,
});
const updateOrderStatusByAdminSuccess = () => ({
  type: actionTypes.UPDATE_ORDER_STATUS_SUCCESS,
});
const updateOrderStatusByAdminError = (e) => ({
  type: actionTypes.UPDATE_ORDER_STATUS_ERROR,
  payload: e,
});

export const updateOrderStatusByAdminAction =
  (orderId, orderStatus, token) => async (dispatch) => {
    try {
      dispatch(updateOrderStatusByAdminRequest());
      // Request to DB
      const response = await updateOrderStatus(orderId, orderStatus, token);

      if (response.data.orderStatusUpdated) {
        dispatch(updateOrderStatusByAdminSuccess());
      }
    } catch (error) {
      dispatch(updateOrderStatusByAdminError());
    }
  };
