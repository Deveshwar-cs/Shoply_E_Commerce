import * as actionTypes from '../actions/types';

const initialState = {
  cashOnDelivery: false,
};

export const cashOnDeliveryReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_CASH_ON_DELIVERY:
      return {
        cashOnDelivery: payload,
      };

    default:
      return state;
  }
};

export default cashOnDeliveryReducer;
