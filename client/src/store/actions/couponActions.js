import { notification } from 'antd';
import * as actionTypes from '../actions/types';

import {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
} from '../../functions/couponFunctions';

// Create coupon actions

const createCouponRequest = () => ({ type: actionTypes.CREATE_COUPON_REQUEST });
const createCouponSuccess = () => ({
  type: actionTypes.CREATE_COUPON_SUCCESS,
});
const createCouponError = (e) => ({
  type: actionTypes.CREATE_COUPON_ERROR,
  payload: e,
});

export const createCouponAction = (coupon, token) => async (dispatch) => {
  try {
    dispatch(createCouponRequest());
    // Request to DB
    const response = await createCoupon(coupon, token);

    dispatch(createCouponSuccess());
    notification.success({
      message: `'${response.data.name}' coupon successfully created!`,
    });
  } catch (error) {
    dispatch(createCouponError(error));
    notification.error({
      message: `Coupon create error!`,
    });
    console.log('createCouponAction error', error);
  }
};

// Get all coupons actions
const getAllCouponsRequest = () => ({
  type: actionTypes.GET_ALL_COUPONS_REQUEST,
});
const getAllCouponsSuccess = (coupons) => ({
  type: actionTypes.GET_ALL_COUPONS_SUCCESS,
  payload: coupons,
});
const getAllCouponsError = (e) => ({
  type: actionTypes.GET_ALL_COUPONS_ERROR,
  payload: e,
});

export const getAllCouponsAction = (token) => async (dispatch) => {
  try {
    dispatch(getAllCouponsRequest());

    // Request to DB
    const coupons = await getAllCoupons(token);
    dispatch(getAllCouponsSuccess(coupons.data));
  } catch (error) {
    dispatch(getAllCouponsError(error));
    console.log('getAllCouponsAction error', error);
  }
};

// Delete coupon actions

const deleteCouponRequest = () => ({ type: actionTypes.DELETE_COUPON_REQUEST });
const deleteCouponSuccess = () => ({
  type: actionTypes.DELETE_COUPON_SUCCESS,
});
const deleteCouponError = (e) => ({
  type: actionTypes.DELETE_COUPON_ERROR,
  payload: e,
});

export const deleteCouponAction = (couponId, token) => async (dispatch) => {
  try {
    dispatch(deleteCouponRequest());

    // Request to DB
    await deleteCoupon(couponId, token);

    dispatch(deleteCouponSuccess());
    notification.success({
      message: `Coupon successfully deleted!`,
    });
  } catch (error) {
    dispatch(deleteCouponError(error));
    notification.error({
      message: `Delete coupon failed!`,
      description: error.message,
    });
  }
};
