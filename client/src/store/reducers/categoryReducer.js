import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
  GET_ONE_CATEGORY_REQUEST,
  GET_ONE_CATEGORY_SUCCESS,
  GET_ONE_CATEGORY_ERROR,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
} from '../actions/types';

const initialState = {
  createCategoryInProgress: false,
  createCategoryError: null,

  getCategoriesInProgress: false,
  getCategoriesError: null,

  deleteCategoryInProgress: false,
  deleteCategoryError: null,

  updateCategoryInProgress: false,
  updateCategoryError: null,

  getOneCategoryInProgress: false,
  getOneCategoryError: null,

  allCategories: [],

  oneCategory: null,
};

export const categoryReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        createCategoryInProgress: true,
        createCategoryError: null,
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        createCategoryInProgress: false,
        createCategoryError: null,
      };
    case CREATE_CATEGORY_ERROR:
      return {
        ...state,
        createCategoryInProgress: false,
        createCategoryError: payload,
      };

    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        getCategoriesInProgress: true,
        getCategoriesError: null,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        getCategoriesInProgress: false,
        getCategoriesError: null,
        allCategories: [...payload],
        oneCategory: null,
      };
    case GET_CATEGORIES_ERROR:
      return {
        ...state,
        getCategoriesInProgress: false,
        getCategoriesError: payload,
      };

    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        deleteCategoryInProgress: true,
        deleteCategoryError: null,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteCategoryInProgress: false,
        deleteCategoryError: null,
      };
    case DELETE_CATEGORY_ERROR:
      return {
        ...state,
        deleteCategoryInProgress: false,
        deleteCategoryError: payload,
      };

    case UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        updateCategoryInProgress: true,
        updateCategoryError: null,
        oneCategory: null,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        updateCategoryInProgress: false,
        updateCategoryError: null,
      };
    case UPDATE_CATEGORY_ERROR:
      return {
        ...state,
        updateCategoryInProgress: false,
        updateCategoryError: payload,
      };

    case GET_ONE_CATEGORY_REQUEST:
      return {
        ...state,
        getOneCategoryInProgress: true,
        getOneCategoryError: null,
      };
    case GET_ONE_CATEGORY_SUCCESS:
      return {
        ...state,
        getOneCategoryInProgress: false,
        getOneCategoryError: null,
        oneCategory: payload,
      };
    case GET_ONE_CATEGORY_ERROR:
      return {
        ...state,
        getOneCategoryInProgress: false,
        getOneCategoryError: payload,
      };

    default:
      return state;
  }
};

export default categoryReducer;
