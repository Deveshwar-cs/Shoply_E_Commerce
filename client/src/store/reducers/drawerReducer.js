import { SET_CART_DRAWER_VISABILITY } from '../actions/types';

const initialState = {
  cartIsVisibile: false,
};

export const drawerReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CART_DRAWER_VISABILITY:
      return {
        ...state,
        cartIsVisibile: payload,
      };
    default:
      return state;
  }
};

export default drawerReducer;
