import { toast } from 'react-toastify';

import {
  createCategory,
  getAllCategories,
  deleteCategory,
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
} from '../actions/types';

const createCategoryRequest = () => ({ type: CREATE_CATEGORY_REQUEST });
const createCategorySuccess = () => ({
  type: CREATE_CATEGORY_SUCCESS,
});
const createCategoryError = (e) => ({
  type: CREATE_CATEGORY_ERROR,
  payload: e,
});

// Create category
export const createCategoryAction = (name, token) => async (dispatch) => {
  try {
    dispatch(createCategoryRequest());
    // Request to DB
    await createCategory(name, token);

    dispatch(createCategorySuccess(name));

    toast.success(`Category ${name} successfully created!`);
  } catch (error) {
    dispatch(createCategoryError());
    toast.error(error.message);
    console.log('createCategoryAction error', error);
    console.log('createCategoryAction error message', error.message);
    return new Promise((resolve, reject) => {
      reject('Something went wrong. Maybe this category already exist');
    });
  }
};

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
