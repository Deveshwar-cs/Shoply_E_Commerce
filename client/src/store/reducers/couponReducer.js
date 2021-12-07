import * as actionTypes from '../actions/types';

const initialState = {
  createCouponInProgress: false,
  createCouponError: null,

  getAllCouponsInProgress: false,
  getAllCouponsError: null,

  allCoupons: [],

  deleteCouponInProgress: false,
  deleteCouponError: null,
};

export const couponReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CREATE_COUPON_REQUEST:
      return {
        ...state,
        createCouponInProgress: true,
      };
    case actionTypes.CREATE_COUPON_SUCCESS:
      return {
        ...state,
        createCouponInProgress: false,
      };
    case actionTypes.CREATE_COUPON_ERROR:
      return {
        ...state,
        createCouponInProgress: false,
        createCouponError: payload,
      };
    case actionTypes.GET_ALL_COUPONS_REQUEST:
      return {
        ...state,
        getAllCouponsInProgress: true,
      };
    case actionTypes.GET_ALL_COUPONS_SUCCESS:
      return {
        ...state,
        getAllCouponsInProgress: false,
        allCoupons: payload,
      };
    case actionTypes.GET_ALL_COUPONS_ERROR:
      return {
        ...state,
        getAllCouponsInProgress: false,
        getAllCouponsError: payload,
      };
    case actionTypes.DELETE_COUPON_REQUEST:
      return {
        ...state,
        deleteCouponInProgress: true,
      };
    case actionTypes.DELETE_COUPON_SUCCESS:
      return {
        ...state,
        deleteCouponInProgress: false,
      };
    case actionTypes.DELETE_COUPON_ERROR:
      return {
        ...state,
        deleteCouponInProgress: false,
        deleteCouponError: payload,
      };

    default:
      return state;
  }
};

export default couponReducer;
