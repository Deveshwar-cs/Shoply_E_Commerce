import { notification } from 'antd';
import * as actionTypes from '../actions/types';

import { createUserOrder } from '../../functions/userFunctions';
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
