import * as actionTypes from '../actions/types';

const initialState = {
  createSubCategoryInProgress: false,
  createSubCategoryError: null,

  getSubCategoriesInProgress: false,
  getSubCategoriesError: null,

  deleteSubCategoryInProgress: false,
  deleteSubCategoryError: null,

  updateSubCategoryInProgress: false,
  updateSubCategoryError: null,

  getOneSubCategoryInProgress: false,
  getOneSubCategoryError: null,

  allSubCategories: [],

  oneSubCategory: null,
  parentCategory: '',
};

export const subCategoryReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CREATE_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        createSubCategoryInProgress: true,
        createSubCategoryError: null,
      };
    case actionTypes.CREATE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        createSubCategoryInProgress: false,
        createSubCategoryError: null,
      };
    case actionTypes.CREATE_SUB_CATEGORY_ERROR:
      return {
        ...state,
        createSubCategoryInProgress: false,
        createSubCategoryError: payload,
      };

    case actionTypes.GET_SUB_CATEGORIES_REQUEST:
      return {
        ...state,
        getSubCategoriesInProgress: true,
        getSubCategoriesError: null,
      };
    case actionTypes.GET_SUB_CATEGORIES_SUCCESS:
      return {
        ...state,
        getSubCategoriesInProgress: false,
        getSubCategoriesError: null,
        allSubCategories: [...payload],
        oneSubCategory: null,
      };
    case actionTypes.GET_SUB_CATEGORIES_ERROR:
      return {
        ...state,
        getSubCategoriesInProgress: false,
        getSubCategoriesError: payload,
      };

    case actionTypes.DELETE_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        deleteSubCategoryInProgress: true,
        deleteSubCategoryError: null,
      };
    case actionTypes.DELETE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteSubCategoryInProgress: false,
        deleteSubCategoryError: null,
      };
    case actionTypes.DELETE_SUB_CATEGORY_ERROR:
      return {
        ...state,
        deleteSubCategoryInProgress: false,
        deleteSubCategoryError: payload,
      };

    case actionTypes.UPDATE_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        updateSubCategoryInProgress: true,
        updateSubCategoryError: null,
        oneSubCategory: null,
      };
    case actionTypes.UPDATE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        updateSubCategoryInProgress: false,
        updateSubCategoryError: null,
      };
    case actionTypes.UPDATE_SUB_CATEGORY_ERROR:
      return {
        ...state,
        updateSubCategoryInProgress: false,
        updateSubCategoryError: payload,
      };

    case actionTypes.GET_ONE_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        getOneSubCategoryInProgress: true,
        getOneSubCategoryError: null,
      };
    case actionTypes.GET_ONE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        getOneSubCategoryInProgress: false,
        getOneSubCategoryError: null,
        oneSubCategory: payload,
      };
    case actionTypes.GET_ONE_SUB_CATEGORY_ERROR:
      return {
        ...state,
        getOneSubCategoryInProgress: false,
        getOneSubCategoryError: payload,
      };

    case actionTypes.SET_PARENT_CATEGORY:
      return {
        ...state,
        parentCategory: payload,
      };

    case actionTypes.CLEAR_PARENT_CATEGORY:
      return {
        ...state,
        parentCategory: '',
      };

    default:
      return state;
  }
};

export default subCategoryReducer;
