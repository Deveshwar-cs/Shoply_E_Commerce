import { notification } from 'antd';

import {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
  getOneCategory,
} from '../../functions/categoryFunctions';

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
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
  GET_ONE_CATEGORY_REQUEST,
  GET_ONE_CATEGORY_SUCCESS,
  GET_ONE_CATEGORY_ERROR,
} from '../actions/types';

// Create category actions

const createCategoryRequest = () => ({ type: CREATE_CATEGORY_REQUEST });
const createCategorySuccess = () => ({
  type: CREATE_CATEGORY_SUCCESS,
});
const createCategoryError = (e) => ({
  type: CREATE_CATEGORY_ERROR,
  payload: e,
});

export const createCategoryAction = (name, token) => async (dispatch) => {
  try {
    dispatch(createCategoryRequest());
    // Request to DB
    await createCategory(name, token);

    dispatch(createCategorySuccess());

    notification.success({
      message: `Category ${name} successfully created!`,
    });
  } catch (error) {
    dispatch(createCategoryError(error));

    notification.error({
      message: error.message,
    });
    console.log('createCategoryAction error', error);
  }
};

// Get all categories actions

const getCategoriesRequest = () => ({ type: GET_CATEGORIES_REQUEST });
const getCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: categories,
});
const getCategoriesError = (e) => ({
  type: GET_CATEGORIES_ERROR,
  payload: e,
});

export const getAllCategoriesAction = () => async (dispatch) => {
  try {
    dispatch(getCategoriesRequest());
    // Request to DB
    const categories = await getAllCategories();

    dispatch(getCategoriesSuccess(categories.data));
  } catch (error) {
    dispatch(getCategoriesError());
  }
};

// Delete category actions

const deleteCategoryRequest = () => ({ type: DELETE_CATEGORY_REQUEST });
const deleteCategorySuccess = () => ({
  type: DELETE_CATEGORY_SUCCESS,
});
const deleteCategoryError = (e) => ({
  type: DELETE_CATEGORY_ERROR,
  payload: e,
});

export const deleteCategoryAction = (slug, token) => async (dispatch) => {
  try {
    dispatch(deleteCategoryRequest());

    // Request to DB
    await deleteCategory(slug, token);

    dispatch(deleteCategorySuccess());
  } catch (error) {
    dispatch(deleteCategoryError());
    return new Promise((resolve, reject) => {
      reject('Delete category Error');
    });
  }
};

// Update category actions

const updateCategoryRequest = () => ({ type: UPDATE_CATEGORY_REQUEST });
const updateCategorySuccess = () => ({
  type: UPDATE_CATEGORY_SUCCESS,
});
const updateCategoryError = (e) => ({
  type: UPDATE_CATEGORY_ERROR,
  payload: e,
});

export const updateCategoryAction =
  (slug, category, token) => async (dispatch) => {
    try {
      dispatch(updateCategoryRequest());

      // Request to DB
      await updateCategory(slug, category, token);

      dispatch(updateCategorySuccess());
    } catch (error) {
      dispatch(updateCategoryError(error));
    }
  };

// Get one category actions

const getOneCategoryRequest = () => ({ type: GET_ONE_CATEGORY_REQUEST });
const getOneCategorySuccess = (category) => ({
  type: GET_ONE_CATEGORY_SUCCESS,
  payload: category,
});
const getOneCategoryError = (e) => ({
  type: GET_ONE_CATEGORY_ERROR,
  payload: e,
});

export const getOneCategoryAction = (slug) => async (dispatch) => {
  try {
    dispatch(getOneCategoryRequest());

    // Request to DB
    const category = await getOneCategory(slug);

    dispatch(getOneCategorySuccess(category.data));
  } catch (error) {
    dispatch(getOneCategoryError(error));
  }
};
