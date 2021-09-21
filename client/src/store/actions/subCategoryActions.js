import { toast } from 'react-toastify';

import {
  createSubCategory,
  getAllSubCategories,
  deleteSubCategory,
  updateSubCategory,
  getOneSubCategory,
} from '../../functions/subCategoryFunctions';

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
  UPDATE_SUB_CATEGORY_REQUEST,
  UPDATE_SUB_CATEGORY_SUCCESS,
  UPDATE_SUB_CATEGORY_ERROR,
  GET_ONE_SUB_CATEGORY_REQUEST,
  GET_ONE_SUB_CATEGORY_SUCCESS,
  GET_ONE_SUB_CATEGORY_ERROR,
  SET_PARENT_CATEGORY,
  CLEAR_PARENT_CATEGORY,
} from '../actions/types';

// Create subcategory actions

const createSubCategoryRequest = () => ({ type: CREATE_SUB_CATEGORY_REQUEST });
const createSubCategorySuccess = () => ({
  type: CREATE_SUB_CATEGORY_SUCCESS,
});
const createSubCategoryError = (e) => ({
  type: CREATE_SUB_CATEGORY_ERROR,
  payload: e,
});

export const createSubCategoryAction =
  (name, category, token) => async (dispatch) => {
    try {
      dispatch(createSubCategoryRequest());
      // Request to DB
      await createSubCategory(name, category, token);

      dispatch(createSubCategorySuccess());

      toast.success(`Subcategory ${name} successfully created!`);
    } catch (error) {
      dispatch(createSubCategoryError(error));
      toast.error(error.message);
    }
  };

// Get all subcategories actions

const getSubCategoriesRequest = () => ({ type: GET_SUB_CATEGORIES_REQUEST });
const getSubCategoriesSuccess = (categories) => ({
  type: GET_SUB_CATEGORIES_SUCCESS,
  payload: categories,
});
const getSubCategoriesError = (e) => ({
  type: GET_SUB_CATEGORIES_ERROR,
  payload: e,
});

export const getAllSubCategoriesAction = () => async (dispatch) => {
  try {
    dispatch(getSubCategoriesRequest());
    // Request to DB
    const subCategories = await getAllSubCategories();

    dispatch(getSubCategoriesSuccess(subCategories.data));
  } catch (error) {
    dispatch(getSubCategoriesError(error));
  }
};

// Delete subcategory actions

const deleteSubCategoryRequest = () => ({ type: DELETE_SUB_CATEGORY_REQUEST });
const deleteSubCategorySuccess = () => ({
  type: DELETE_SUB_CATEGORY_SUCCESS,
});
const deleteSubCategoryError = (e) => ({
  type: DELETE_SUB_CATEGORY_ERROR,
  payload: e,
});

export const deleteSubCategoryAction = (slug, token) => async (dispatch) => {
  try {
    dispatch(deleteSubCategoryRequest());

    // Request to DB
    await deleteSubCategory(slug, token);

    dispatch(deleteSubCategorySuccess());
  } catch (error) {
    dispatch(deleteSubCategoryError(error));
    return new Promise((resolve, reject) => {
      reject('Delete category Error');
    });
  }
};

// Update subcategory actions

const updateSubCategoryRequest = () => ({ type: UPDATE_SUB_CATEGORY_REQUEST });
const updateSubCategorySuccess = () => ({
  type: UPDATE_SUB_CATEGORY_SUCCESS,
});
const updateSubCategoryError = (e) => ({
  type: UPDATE_SUB_CATEGORY_ERROR,
  payload: e,
});

export const updateSubCategoryAction =
  (slug, subCategory, token) => async (dispatch) => {
    try {
      dispatch(updateSubCategoryRequest());

      // Request to DB
      await updateSubCategory(slug, subCategory, token);

      dispatch(updateSubCategorySuccess());
    } catch (error) {
      dispatch(updateSubCategoryError(error));
    }
  };

// Get one subcategory actions

const getOneSubCategoryRequest = () => ({ type: GET_ONE_SUB_CATEGORY_REQUEST });
const getOneSubCategorySuccess = (category) => ({
  type: GET_ONE_SUB_CATEGORY_SUCCESS,
  payload: category,
});
const getOneSubCategoryError = (e) => ({
  type: GET_ONE_SUB_CATEGORY_ERROR,
  payload: e,
});

export const getOneSubCategoryAction = (slug) => async (dispatch) => {
  try {
    dispatch(getOneSubCategoryRequest());

    // Request to DB
    const category = await getOneSubCategory(slug);

    dispatch(getOneSubCategorySuccess(category.data));
  } catch (error) {
    dispatch(getOneSubCategoryError(error));
  }
};

// Set parent category for subcategory

export const setParentCategory = (parentCategor) => ({
  type: SET_PARENT_CATEGORY,
  payload: parentCategor,
});
export const clearParentCategory = () => ({ type: CLEAR_PARENT_CATEGORY });
