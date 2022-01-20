import { notification } from 'antd';

import {
  createSubCategory,
  getAllSubCategories,
  deleteSubCategory,
  updateSubCategory,
  getOneSubCategory,
} from '../../functions/subCategoryFunctions';

import * as actionTypes from '../actions/types';

// Create subcategory actions

const createSubCategoryRequest = () => ({
  type: actionTypes.CREATE_SUB_CATEGORY_REQUEST,
});
const createSubCategorySuccess = () => ({
  type: actionTypes.CREATE_SUB_CATEGORY_SUCCESS,
});
const createSubCategoryError = (e) => ({
  type: actionTypes.CREATE_SUB_CATEGORY_ERROR,
  payload: e,
});

export const createSubCategoryAction =
  (name, category, token) => async (dispatch) => {
    try {
      dispatch(createSubCategoryRequest());
      // Request to DB
      await createSubCategory(name, category, token);

      dispatch(createSubCategorySuccess());

      notification.success({
        message: `Subcategory ${name} successfully created!`,
      });
    } catch (error) {
      dispatch(createSubCategoryError(error));
      notification.error({
        message: error.message,
      });
    }
  };

// Get all subcategories actions

const getSubCategoriesRequest = () => ({
  type: actionTypes.GET_SUB_CATEGORIES_REQUEST,
});
const getSubCategoriesSuccess = (categories) => ({
  type: actionTypes.GET_SUB_CATEGORIES_SUCCESS,
  payload: categories,
});
const getSubCategoriesError = (e) => ({
  type: actionTypes.GET_SUB_CATEGORIES_ERROR,
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

const deleteSubCategoryRequest = () => ({
  type: actionTypes.DELETE_SUB_CATEGORY_REQUEST,
});
const deleteSubCategorySuccess = () => ({
  type: actionTypes.DELETE_SUB_CATEGORY_SUCCESS,
});
const deleteSubCategoryError = (e) => ({
  type: actionTypes.DELETE_SUB_CATEGORY_ERROR,
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

const updateSubCategoryRequest = () => ({
  type: actionTypes.UPDATE_SUB_CATEGORY_REQUEST,
});
const updateSubCategorySuccess = () => ({
  type: actionTypes.UPDATE_SUB_CATEGORY_SUCCESS,
});
const updateSubCategoryError = (e) => ({
  type: actionTypes.UPDATE_SUB_CATEGORY_ERROR,
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

const getOneSubCategoryRequest = () => ({
  type: actionTypes.GET_ONE_SUB_CATEGORY_REQUEST,
});
const getOneSubCategorySuccess = (category) => ({
  type: actionTypes.GET_ONE_SUB_CATEGORY_SUCCESS,
  payload: category,
});
const getOneSubCategoryError = (e) => ({
  type: actionTypes.GET_ONE_SUB_CATEGORY_ERROR,
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
  type: actionTypes.SET_PARENT_CATEGORY,
  payload: parentCategor,
});
export const clearParentCategory = () => ({
  type: actionTypes.CLEAR_PARENT_CATEGORY,
});
