import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_REQUEST,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_SUCCESS,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_ERROR,
  CLEAR_SUBCATEGORIES_BY_PARENT_PRODUCT,
  SET_UPLOADED_IMAGES,
  CLEAR_UPLOADED_IMAGES,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_ERROR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  GET_ONE_PRODUCT_REQUEST,
  GET_ONE_PRODUCT_SUCCESS,
  GET_ONE_PRODUCT_ERROR,
  CLAER_ONE_PRODUCT,
  RATE_PRODUCT_REQUEST,
  RATE_PRODUCT_SUCCESS,
  RATE_PRODUCT_ERROR,
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

    case SET_UPLOADED_IMAGES:
      return {
        ...state,
        uploadedImages: [...payload],
      };
    case CLEAR_UPLOADED_IMAGES:
      return {
        ...state,
        uploadedImages: [],
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

    case GET_ONE_PRODUCT_REQUEST:
      return {
        ...state,
        getOneProductInProgress: true,
      };
    case GET_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        getOneProductInProgress: false,
        oneProduct: payload,
      };
    case GET_ONE_PRODUCT_ERROR:
      return {
        ...state,
        getOneProductInProgress: false,
        getOneProductError: payload,
      };
    case CLAER_ONE_PRODUCT:
      return {
        ...state,
        oneProduct: null,
      };

    case RATE_PRODUCT_REQUEST:
      return {
        ...state,
        rateProductInProgress: true,
      };
    case RATE_PRODUCT_SUCCESS:
      return {
        ...state,
        rateProductInProgress: false,
      };
    case RATE_PRODUCT_ERROR:
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
