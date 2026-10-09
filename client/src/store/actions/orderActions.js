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

import { getCartAction } from '../actions/cartActions';

import { emptyCartInDBAction, clearCart } from '../actions/cartActions';

// ======================================================
// CREATE ORDER ACTIONS - CARD PAYMENT
// ======================================================

const createOrderRequest = () => ({
  type: actionTypes.CREATE_ORDER_REQUEST,
});

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
        // Delete cart from DB first
        await dispatch(emptyCartInDBAction(token));

        // Delete cart from Redux + localStorage
        dispatch(clearCart());

        dispatch(createOrderSuccess());

        dispatch(getCartAction(token));

        notification.success({
          message: 'Order successfully created!',
        });
      }

      return response.data;
    } catch (error) {
      dispatch(createOrderError(error));

      notification.error({
        message: 'Order create error!',
        description: error.message,
      });

      console.log('createOrderAction error', error);

      throw error;
    }
  };

// ======================================================
// CREATE ORDER WITH CASH PAYMENT
// ======================================================

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
        dispatch(
          createOrderCashPaymentError(new Error('Order was not created'))
        );

        notification.error({
          message: 'Create order with cash payment failed!',
        });

        return response.data;
      }

      dispatch(createOrderCashPaymentSuccess());

      // Delete cart from DB
      await dispatch(emptyCartInDBAction(token));

      // Delete cart from Redux + localStorage
      dispatch(clearCart());

      notification.success({
        message: 'Order successfully created!',
      });

      return response.data;
    } catch (error) {
      dispatch(createOrderCashPaymentError(error));

      notification.error({
        message: 'Create order with cash payment error!',
        description: error.message,
      });

      console.log('createOrderCashPaymentAction error', error);

      throw error;
    }
  };

// ======================================================
// GET ALL ORDERS BY USER
// ======================================================

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

    return allOrdersByUser.data;
  } catch (error) {
    dispatch(getAllOrdersByUserError(error));

    console.log('getAllOrdersByUserAction error', error);

    throw error;
  }
};

// ======================================================
// GET ALL ORDERS BY ADMIN
// ======================================================

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

    return allOrdersByAdmin.data;
  } catch (error) {
    dispatch(getAllOrdersByAdminError(error));

    console.log('getAllOrdersByAdminAction error', error);

    throw error;
  }
};

// ======================================================
// UPDATE ORDER STATUS BY ADMIN
// ======================================================

const updateOrderStatusByAdminRequest = () => ({
  type: actionTypes.UPDATE_ORDER_STATUS_REQUEST,
});

const updateOrderStatusByAdminSuccess = (orderId, orderStatus) => ({
  type: actionTypes.UPDATE_ORDER_STATUS_SUCCESS,
  payload: { orderId, orderStatus },
});

const updateOrderStatusByAdminError = (error) => ({
  type: actionTypes.UPDATE_ORDER_STATUS_ERROR,
  payload: error,
});

export const updateOrderStatusByAdminAction =
  (orderId, orderStatus, token) => async (dispatch) => {
    try {
      dispatch(updateOrderStatusByAdminRequest());

      const response = await updateOrderStatus(orderId, orderStatus, token);

      if (!response.data.orderStatusUpdated) {
        throw new Error('The server did not confirm the order status update.');
      }

      // Update Redux only after the backend confirms success.
      dispatch(updateOrderStatusByAdminSuccess(orderId, orderStatus));

      notification.success({
        message: 'Order status updated',
        description: `Order status changed to ${orderStatus}.`,
      });

      return response.data;
    } catch (error) {
      dispatch(updateOrderStatusByAdminError(error));

      notification.error({
        message: 'Unable to update order status',
        description:
          error.response?.data?.message || error.message || 'Please try again.',
      });

      throw error;
    }
  };
