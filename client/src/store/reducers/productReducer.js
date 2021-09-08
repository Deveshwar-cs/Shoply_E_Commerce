import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_REQUEST,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_SUCCESS,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_ERROR,
  CLEAR_SUBCATEGORIES_BY_PARENT_PRODUCT_SUCCESS,
} from '../actions/types';

const initialState = {
  createProductInProgress: false,
  createProductError: null,

  getProductsInProgress: false,
  getProductsError: null,

  deleteProductInProgress: false,
  deleteProductError: null,

  updateProductInProgress: false,
  updateProductError: null,

  getOneProductInProgress: false,
  getOneProductError: null,

  allProducts: [],

  getAllSubByParentInProgress: false,
  getAllSubByParentError: null,

  allSubsByParent: [],
  oneProduct: null,
};

export const productReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        createProductInProgress: true,
        createProductError: null,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        createProductInProgress: false,
        createProductError: null,
      };
    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        createProductInProgress: false,
        createProductError: payload,
      };

    case GET_SUBCATEGORIES_BY_PARENT_PRODUCT_REQUEST:
      return {
        ...state,
        getAllSubByParentInProgress: true,
        getAllSubByParentError: null,
      };

    case GET_SUBCATEGORIES_BY_PARENT_PRODUCT_SUCCESS:
      return {
        ...state,
        getAllSubByParentInProgress: false,
        getAllSubByParentError: null,
        allSubsByParent: payload,
      };

    case GET_SUBCATEGORIES_BY_PARENT_PRODUCT_ERROR:
      return {
        ...state,
        getAllSubByParentInProgress: false,
        getAllSubByParentError: payload,
      };

    case CLEAR_SUBCATEGORIES_BY_PARENT_PRODUCT_SUCCESS:
      return {
        ...state,
        allSubsByParent: '',
      };

    default:
      return state;
  }
};

export default productReducer;
