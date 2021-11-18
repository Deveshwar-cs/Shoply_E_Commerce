import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions/types';

const initialState = { items: [], totalQuantity: 0, totalPrice: 0 };

export const cartReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      // Check if product item is alredy added to cart
      const existItemIndex = state.items.findIndex(
        (product) => product._id === payload._id
      );

      if (existItemIndex >= 0) {
        return {
          items: [
            ...state.items.map((item) =>
              item._id === payload._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          ],
          totalQuantity: state.totalQuantity + 1,
          totalPrice: state.totalPrice + payload.price,
        };
      } else {
        let tempProductItem = { ...action.payload, quantity: 1 };
        return {
          //...state,
          items: [...state.items, { ...tempProductItem }],
          totalQuantity: state.totalQuantity + 1,
          totalPrice: state.totalPrice + payload.price,
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
      };
    case CLEAR_CART:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default cartReducer;
