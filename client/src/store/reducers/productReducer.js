import * as actionTypes from '../actions/types';

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

  rateProductInProgress: false,
  rateProductError: null,

  allProducts: [],

  getAllSubByParentInProgress: false,
  getAllSubByParentError: null,

  allSubsByParent: [],
  oneProduct: null,
  // here we store uploaded images (from FileUpload component) that using in ProductCreateForm and ProductUpdateForm
  uploadedImages: [],
};

export const productReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        createProductInProgress: true,
        createProductError: null,
      };
    case actionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        createProductInProgress: false,
        createProductError: null,
      };
    case actionTypes.CREATE_PRODUCT_ERROR:
      return {
        ...state,
        createProductInProgress: false,
        createProductError: payload,
      };

    case actionTypes.GET_SUBCATEGORIES_BY_PARENT_PRODUCT_REQUEST:
      return {
        ...state,
        getAllSubByParentInProgress: true,
        getAllSubByParentError: null,
      };

    case actionTypes.GET_SUBCATEGORIES_BY_PARENT_PRODUCT_SUCCESS:
      return {
        ...state,
        getAllSubByParentInProgress: false,
        getAllSubByParentError: null,
        allSubsByParent: payload,
      };

    case actionTypes.GET_SUBCATEGORIES_BY_PARENT_PRODUCT_ERROR:
      return {
        ...state,
        getAllSubByParentInProgress: false,
        getAllSubByParentError: payload,
      };

    case actionTypes.CLEAR_SUBCATEGORIES_BY_PARENT_PRODUCT:
      return {
        ...state,
        allSubsByParent: [],
      };

    case actionTypes.SET_UPLOADED_IMAGES:
      return {
        ...state,
        uploadedImages: [...payload],
      };
    case actionTypes.CLEAR_UPLOADED_IMAGES:
      return {
        ...state,
        uploadedImages: [],
      };
    case actionTypes.GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        getProductsInProgress: true,
      };
    case actionTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        getProductsInProgress: false,
        allProducts: [...payload],
      };
    case actionTypes.GET_ALL_PRODUCTS_ERROR:
      return {
        ...state,
        getProductsInProgress: false,
        getProductsError: payload,
      };
    case actionTypes.CLEAR_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: [],
      };

    case actionTypes.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        deleteProductInProgress: true,
      };
    case actionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deleteProductInProgress: false,
      };
    case actionTypes.DELETE_PRODUCT_ERROR:
      return {
        ...state,
        deleteProductInProgress: false,
        deleteProductError: payload,
      };

    case actionTypes.GET_ONE_PRODUCT_REQUEST:
      return {
        ...state,
        getOneProductInProgress: true,
      };
    case actionTypes.GET_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        getOneProductInProgress: false,
        oneProduct: payload,
      };
    case actionTypes.GET_ONE_PRODUCT_ERROR:
      return {
        ...state,
        getOneProductInProgress: false,
        getOneProductError: payload,
      };
    case actionTypes.CLAER_ONE_PRODUCT:
      return {
        ...state,
        oneProduct: null,
      };

    case actionTypes.RATE_PRODUCT_REQUEST:
      return {
        ...state,
        rateProductInProgress: true,
      };
    case actionTypes.RATE_PRODUCT_SUCCESS:
      return {
        ...state,
        rateProductInProgress: false,
      };
    case actionTypes.RATE_PRODUCT_ERROR:
      return {
        ...state,
        rateProductInProgress: false,
        rateProductError: payload,
      };
    default:
      return state;
  }
};

export default productReducer;
