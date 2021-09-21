import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_REQUEST,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_SUCCESS,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_ERROR,
  CLEAR_SUBCATEGORIES_BY_PARENT_PRODUCT,
  SET_IMGURL_IN_PRODUCT_FORM,
  CLEAR_IMGURL_IN_PRODUCT_FORM,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_ERROR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
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

  imgURLs: [],
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

    case CLEAR_SUBCATEGORIES_BY_PARENT_PRODUCT:
      return {
        ...state,
        allSubsByParent: [],
      };

    case SET_IMGURL_IN_PRODUCT_FORM:
      return {
        ...state,
        imgURLs: [...payload],
      };
    case CLEAR_IMGURL_IN_PRODUCT_FORM:
      return {
        ...state,
        imgURLs: [],
      };
    case GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        getProductsInProgress: true,
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        getProductsInProgress: false,
        allProducts: [...payload],
      };
    case GET_ALL_PRODUCTS_ERROR:
      return {
        ...state,
        getProductsInProgress: false,
        getProductsError: payload,
      };

    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        deleteProductInProgress: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deleteProductInProgress: false,
      };
    case DELETE_PRODUCT_ERROR:
      return {
        ...state,
        deleteProductInProgress: false,
        deleteProductError: payload,
      };

    default:
      return state;
  }
};

export default productReducer;
