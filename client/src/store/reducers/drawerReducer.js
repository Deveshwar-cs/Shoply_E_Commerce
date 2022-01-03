import * as actionTypes from '../actions/types';

const initialState = {
  cartIsVisibile: false,
  mobileIsVisible: false,
};

export const drawerReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_CART_DRAWER_VISABILITY:
      return {
        ...state,
        cartIsVisibile: payload,
      };
    case actionTypes.SET_MOBILE_DRAWER_VISABILITY:
      return {
        ...state,
        mobileIsVisible: payload,
      };
    default:
      return state;
  }
};

export default drawerReducer;
