import { notification } from 'antd';

import { createProduct } from '../../functions/productFunctions';
import { getAllSubCategoriesByParent } from '../../functions/categoryFunctions';

import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_REQUEST,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_SUCCESS,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_ERROR,
  CLEAR_SUBCATEGORIES_BY_PARENT_PRODUCT,
  SET_IMGURL_IN_PRODUCT_FORM,
  CLEAR_IMGURL_IN_PRODUCT_FORM,
} from '../actions/types';

// Create product actions

const createProductRequest = () => ({ type: CREATE_PRODUCT_REQUEST });
const createProductSuccess = () => ({
  type: CREATE_PRODUCT_SUCCESS,
});
const createProductError = (e) => ({
  type: CREATE_PRODUCT_ERROR,
  payload: e,
});

export const createProductAction = (product, token) => async (dispatch) => {
  try {
    dispatch(createProductRequest());
    // Request to DB
    await createProduct(product, token);

    dispatch(createProductSuccess());

    notification.success({
      message: `Product ${product.title} successfully created!`,
    });
  } catch (error) {
    dispatch(createProductError(error));
    //here we grab error message from server productController error response with axios
    notification.error({
      message: `Create product ${product.title} failed!`,
      description: error.response.data.errormessage,
    });
  }
};

// Get all subcategories by parent category actions
const getAllSubCategoriesByParentRequest = () => ({
  type: GET_SUBCATEGORIES_BY_PARENT_PRODUCT_REQUEST,
});
const getAllSubCategoriesByParentSuccess = (subCategories) => ({
  type: GET_SUBCATEGORIES_BY_PARENT_PRODUCT_SUCCESS,
  payload: subCategories,
});
const getAllSubCategoriesByParentError = (e) => ({
  type: GET_SUBCATEGORIES_BY_PARENT_PRODUCT_ERROR,
  payload: e,
});

export const clearAllSubCategoriesByParent = () => ({
  type: CLEAR_SUBCATEGORIES_BY_PARENT_PRODUCT,
});

export const getAllSubCategoriesByParentAction =
  (parentCategoryId) => async (dispatch) => {
    try {
      dispatch(getAllSubCategoriesByParentRequest());

      const subCategoriesByParent = await getAllSubCategoriesByParent(
        parentCategoryId
      );

      dispatch(getAllSubCategoriesByParentSuccess(subCategoriesByParent.data));
    } catch (error) {
      dispatch(getAllSubCategoriesByParentError(error));
    }
  };

export const setImgInProductForm = (imgsArray) => ({
  type: SET_IMGURL_IN_PRODUCT_FORM,
  payload: imgsArray,
});
export const clearImgInProductForm = () => ({
  type: CLEAR_IMGURL_IN_PRODUCT_FORM,
});
