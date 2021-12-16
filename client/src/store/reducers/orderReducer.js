import * as actionTypes from '../actions/types';

const initialState = {
  createOrderInProgress: false,
  createOrderError: null,

  getAllOrdersInProgress: false,
  getAllOrdersError: null,

  getAllOrdersByUserInProgress: false,
  getAllOrdersByUserError: null,

  allOrdersAdmin: [],
  allOrdersByUser: [],
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
    case actionTypes.GET_ALL_ORDERS_BY_USER_REQUEST:
      return {
        ...state,
        getAllOrdersByUserInProgress: true,
      };
    case actionTypes.GET_ALL_ORDERS_BY_USER_SUCCESS:
      return {
        ...state,
        getAllOrdersByUserInProgress: false,
        allOrdersByUser: payload,
      };
    case actionTypes.GET_ALL_ORDERS_BY_USER_ERROR:
      return {
        ...state,
        getAllOrdersByUserInProgress: false,
        getAllOrdersByUserError: payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
