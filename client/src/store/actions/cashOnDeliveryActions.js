import * as actionTypes from '../actions/types';

export const setCashOnDelivery = (value) => ({
  type: actionTypes.SET_CASH_ON_DELIVERY,
  payload: value,
});
