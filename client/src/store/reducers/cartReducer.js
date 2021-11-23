import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions/types';

// Get shopping-cart from localStorage
const cartFromLocalStorage = JSON.parse(localStorage.getItem('shopping-cart'));

const initialState = cartFromLocalStorage || {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      // Check if product item is alredy added to cart
      const existItemIndex = state.items.findIndex(
        (product) => product._id === payload._id
      );

      if (existItemIndex >= 0) {
        const updatedExistingCart = {
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
        localStorage.setItem(
          'shopping-cart',
          JSON.stringify(updatedExistingCart)
        );
        return updatedExistingCart;
      } else {
        let tempProductItem = { ...action.payload, quantity: 1 };
        const newCart = {
          items: [...state.items, { ...tempProductItem }],
          totalQuantity: state.totalQuantity + 1,
          totalPrice: state.totalPrice + payload.price,
        };
        localStorage.setItem('shopping-cart', JSON.stringify(newCart));
        return newCart;
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
