import {
  CREATE_SUB_CATEGORY_REQUEST,
  CREATE_SUB_CATEGORY_SUCCESS,
  CREATE_SUB_CATEGORY_ERROR,
  GET_SUB_CATEGORIES_REQUEST,
  GET_SUB_CATEGORIES_SUCCESS,
  GET_SUB_CATEGORIES_ERROR,
  DELETE_SUB_CATEGORY_REQUEST,
  DELETE_SUB_CATEGORY_SUCCESS,
  DELETE_SUB_CATEGORY_ERROR,
  GET_ONE_SUB_CATEGORY_REQUEST,
  GET_ONE_SUB_CATEGORY_SUCCESS,
  GET_ONE_SUB_CATEGORY_ERROR,
  UPDATE_SUB_CATEGORY_REQUEST,
  UPDATE_SUB_CATEGORY_SUCCESS,
  UPDATE_SUB_CATEGORY_ERROR,
  SET_PARENT_CATEGORY,
  CLEAR_PARENT_CATEGORY,
} from '../actions/types';

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
    case CREATE_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        createSubCategoryInProgress: true,
        createSubCategoryError: null,
      };
    case CREATE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        createSubCategoryInProgress: false,
        createSubCategoryError: null,
      };
    case CREATE_SUB_CATEGORY_ERROR:
      return {
        ...state,
        createSubCategoryInProgress: false,
        createSubCategoryError: payload,
      };

    case GET_SUB_CATEGORIES_REQUEST:
      return {
        ...state,
        getSubCategoriesInProgress: true,
        getSubCategoriesError: null,
      };
    case GET_SUB_CATEGORIES_SUCCESS:
      return {
        ...state,
        getSubCategoriesInProgress: false,
        getSubCategoriesError: null,
        allSubCategories: [...payload],
        oneSubCategory: null,
      };
    case GET_SUB_CATEGORIES_ERROR:
      return {
        ...state,
        getSubCategoriesInProgress: false,
        getSubCategoriesError: payload,
      };

    case DELETE_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        deleteSubCategoryInProgress: true,
        deleteSubCategoryError: null,
      };
    case DELETE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteSubCategoryInProgress: false,
        deleteSubCategoryError: null,
      };
    case DELETE_SUB_CATEGORY_ERROR:
      return {
        ...state,
        deleteSubCategoryInProgress: false,
        deleteSubCategoryError: payload,
      };

    case UPDATE_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        updateSubCategoryInProgress: true,
        updateSubCategoryError: null,
        oneSubCategory: null,
      };
    case UPDATE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        updateSubCategoryInProgress: false,
        updateSubCategoryError: null,
      };
    case UPDATE_SUB_CATEGORY_ERROR:
      return {
        ...state,
        updateSubCategoryInProgress: false,
        updateSubCategoryError: payload,
      };

    case GET_ONE_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        getOneSubCategoryInProgress: true,
        getOneSubCategoryError: null,
      };
    case GET_ONE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        getOneSubCategoryInProgress: false,
        getOneSubCategoryError: null,
        oneSubCategory: payload,
      };
    case GET_ONE_SUB_CATEGORY_ERROR:
      return {
        ...state,
        getOneSubCategoryInProgress: false,
        getOneSubCategoryError: payload,
      };

    case SET_PARENT_CATEGORY:
      return {
        ...state,
        parentCategory: payload,
      };

    case CLEAR_PARENT_CATEGORY:
      return {
        ...state,
        parentCategory: '',
      };

    default:
      return state;
  }
};

export default subCategoryReducer;
