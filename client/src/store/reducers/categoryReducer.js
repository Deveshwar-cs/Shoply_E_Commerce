import * as actionTypes from '../actions/types';

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
    case actionTypes.CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        createCategoryInProgress: true,
        createCategoryError: null,
      };
    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        createCategoryInProgress: false,
        createCategoryError: null,
      };
    case actionTypes.CREATE_CATEGORY_ERROR:
      return {
        ...state,
        createCategoryInProgress: false,
        createCategoryError: payload,
      };

    case actionTypes.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        getCategoriesInProgress: true,
        getCategoriesError: null,
      };
    case actionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        getCategoriesInProgress: false,
        getCategoriesError: null,
        allCategories: [...payload],
        oneCategory: null,
      };
    case actionTypes.GET_CATEGORIES_ERROR:
      return {
        ...state,
        getCategoriesInProgress: false,
        getCategoriesError: payload,
      };

    case actionTypes.DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        deleteCategoryInProgress: true,
        deleteCategoryError: null,
      };
    case actionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteCategoryInProgress: false,
        deleteCategoryError: null,
      };
    case actionTypes.DELETE_CATEGORY_ERROR:
      return {
        ...state,
        deleteCategoryInProgress: false,
        deleteCategoryError: payload,
      };

    case actionTypes.UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        updateCategoryInProgress: true,
        updateCategoryError: null,
        oneCategory: null,
      };
    case actionTypes.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        updateCategoryInProgress: false,
        updateCategoryError: null,
      };
    case actionTypes.UPDATE_CATEGORY_ERROR:
      return {
        ...state,
        updateCategoryInProgress: false,
        updateCategoryError: payload,
      };

    case actionTypes.GET_ONE_CATEGORY_REQUEST:
      return {
        ...state,
        getOneCategoryInProgress: true,
        getOneCategoryError: null,
      };
    case actionTypes.GET_ONE_CATEGORY_SUCCESS:
      return {
        ...state,
        getOneCategoryInProgress: false,
        getOneCategoryError: null,
        oneCategory: payload,
      };
    case actionTypes.GET_ONE_CATEGORY_ERROR:
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
