import * as actionTypes from '../actions/types';

const initialState = {
  createOrderInProgress: false,
  createOrderError: null,

  getAllOrdersInProgress: false,
  getAllOrdersError: null,

  getAllOrdersByUserInProgress: false,
  getAllOrdersByUserError: null,

  updateOrderStatusInProgress: false,
  updateOrderStatusError: null,

  allOrdersByAdmin: [],
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

    case actionTypes.GET_ALL_ORDERS_BY_ADMIN_REQUEST:
      return {
        ...state,
        getAllOrdersInProgress: true,
      };
    case actionTypes.GET_ALL_ORDERS_BY_ADMIN_SUCCESS:
      return {
        ...state,
        getAllOrdersInProgress: false,
        allOrdersByAdmin: payload,
      };
    case actionTypes.GET_ALL_ORDERS_BY_ADMIN_ERROR:
      return {
        ...state,
        getAllOrdersInProgress: false,
        getAllOrdersError: payload,
      };

    case actionTypes.UPDATE_ORDER_STATUS_REQUEST:
      return {
        ...state,
        updateOrderStatusInProgress: true,
      };
    case actionTypes.UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        updateOrderStatusInProgress: false,
      };
    case actionTypes.UPDATE_ORDER_STATUS_ERROR:
      return {
        ...state,
        updateOrderStatusInProgress: false,
        updateOrderStatusError: payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
