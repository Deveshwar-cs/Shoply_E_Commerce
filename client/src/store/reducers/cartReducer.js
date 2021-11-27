import * as actionTypes from '../actions/types';

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
    case actionTypes.ADD_TO_CART:
      // Check if product item is alredy added to cart
      const existItemIndex = state.items.findIndex(
        (product) => product._id === payload._id
      );

      if (existItemIndex >= 0) {
        const updatedExistingCart = {
          items: [
            ...state.items.map((item) =>
              item._id === payload._id
                ? { ...item, cartQuantity: item.cartQuantity + 1 }
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
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        const newCart = {
          items: [...state.items, { ...tempProductItem }],
          totalQuantity: state.totalQuantity + 1,
          totalPrice: state.totalPrice + payload.price,
        };
        localStorage.setItem('shopping-cart', JSON.stringify(newCart));
        return newCart;
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
      };
    case actionTypes.CLEAR_CART:
      return {
        ...state,
      };
    case actionTypes.SET_ITEM_QUANTITY:
      // update quantity in cart item and make new array of items
      const updatedCartItems = state.items.map((item) => {
        if (item._id === payload.id) {
          return {
            ...item,
            cartQuantity: payload.quantity,
          };
        }
        return item;
      });

      // build new cart with updated items, totalQuantity and totalPrice
      const newCart = {
        items: [...updatedCartItems],
        totalQuantity: updatedCartItems.reduce(
          (sum, item) => sum + item.cartQuantity,
          0
        ),
        totalPrice: updatedCartItems.reduce(
          (sum, item) => sum + item.price * item.cartQuantity,
          0
        ),
      };
      localStorage.setItem('shopping-cart', JSON.stringify(newCart));
      return newCart;
    default:
      return state;
  }
};

export default cartReducer;
