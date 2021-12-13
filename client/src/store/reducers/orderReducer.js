import * as actionTypes from '../actions/types';

const initialState = {
  createOrderInProgress: false,
  createOrderError: null,

  getAllOrdersInProgress: false,
  getAllOrdersError: null,

  allOrders: [],
};

export const orderReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CREATE_ORDER_REQUEST:
      return {
        ...state,
        createOrderInProgress: true,
      };
    case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        createOrderInProgress: false,
      };
    case actionTypes.CREATE_ORDER_ERROR:
      return {
        ...state,
        createOrderInProgress: false,
        createOrderError: payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
