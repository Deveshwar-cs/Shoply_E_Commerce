import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
} from '../actions/types';

const initialState = {
  createCategoryInProgress: false,
  createCategoryError: null,

  getCategoriesInProgress: false,
  getCategoriesError: null,

  allCategories: [],
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
      };
    case GET_CATEGORIES_ERROR:
      return {
        ...state,
        getCategoriesInProgress: false,
        getCategoriesError: payload,
      };

    default:
      return state;
  }
};

export default categoryReducer;
