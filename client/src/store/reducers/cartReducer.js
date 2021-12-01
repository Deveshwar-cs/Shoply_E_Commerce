import * as actionTypes from '../actions/types';

// Get shopping-cart from localStorage
const cartFromLocalStorage = JSON.parse(localStorage.getItem('shopping-cart'));

const initialState = cartFromLocalStorage
  ? {
      cart: cartFromLocalStorage,
      createCartInProgress: false,
      createCartError: null,
    }
  : {
      cart: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      },
      createCartInProgress: false,
      createCartError: null,
    };

export const cartReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ADD_TO_CART:
      // Check if product item is alredy added to cart
      const existItemIndex = state.cart.items.findIndex(
        (product) => product._id === payload._id
      );

      if (existItemIndex >= 0) {
        const updatedExistingCart = {
          items: [
            ...state.cart.items.map((item) =>
              item._id === payload._id
                ? { ...item, cartQuantity: item.cartQuantity + 1 }
                : item
            ),
          ],
          totalQuantity: state.cart.totalQuantity + 1,
          totalPrice: state.cart.totalPrice + payload.price,
        };
        localStorage.setItem(
          'shopping-cart',
          JSON.stringify(updatedExistingCart)
        );
        return { ...state, cart: updatedExistingCart };
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        const newCart = {
          items: [...state.cart.items, { ...tempProductItem }],
          totalQuantity: state.cart.totalQuantity + 1,
          totalPrice: state.cart.totalPrice + payload.price,
        };
        localStorage.setItem('shopping-cart', JSON.stringify(newCart));
        return { ...state, cart: newCart };
      }
    case actionTypes.REMOVE_FROM_CART:
      // build items array without removed item
      const cartItemsWithoutRemoved = state.cart.items.filter(
        (item) => item._id !== payload.id
      );

      // build new cart with updated items, totalQuantity and totalPrice
      const cartWithoutRemoved = {
        items: [...cartItemsWithoutRemoved],
        totalQuantity: cartItemsWithoutRemoved.reduce(
          (sum, item) => sum + item.cartQuantity,
          0
        ),
        totalPrice: cartItemsWithoutRemoved.reduce(
          (sum, item) => sum + item.price * item.cartQuantity,
          0
        ),
      };
      localStorage.setItem('shopping-cart', JSON.stringify(cartWithoutRemoved));
      return { ...state, cart: cartWithoutRemoved };

    case actionTypes.SET_ITEM_QUANTITY:
      // update quantity in cart item and make new array of items
      const updatedCartItems = state.cart.items.map((item) => {
        if (item._id === payload.id) {
          return {
            ...item,
            cartQuantity: payload.quantity,
          };
        }
        return item;
      });

      // build new cart with updated items, totalQuantity and totalPrice
      const updatedCart = {
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
      localStorage.setItem('shopping-cart', JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };
    case actionTypes.CLEAR_CART:
      localStorage.removeItem('shopping-cart');
      return {
        ...state,
        cart: {
          items: [],
          totalQuantity: 0,
          totalPrice: 0,
        },
      };

    case actionTypes.CREATE_CART_REQUEST:
      return {
        ...state,
        createCartInProgress: true,
      };

    case actionTypes.CREATE_CART_SUCCESS:
      return {
        ...state,
        createCartInProgress: false,
        createCartError: null,
      };
    case actionTypes.CREATE_CART_ERROR:
      return {
        ...state,
        createCartInProgress: false,
        createCartError: payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
