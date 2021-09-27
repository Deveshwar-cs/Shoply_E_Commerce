import { notification } from 'antd';

import {
  createProduct,
  getAllProductsByCount,
  deleteProduct,
  getOneProduct,
} from '../../functions/productFunctions';
import { getAllSubCategoriesByParent } from '../../functions/categoryFunctions';

import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_REQUEST,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_SUCCESS,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_ERROR,
  CLEAR_SUBCATEGORIES_BY_PARENT_PRODUCT,
  SET_IMGURL_IN_UPLOAD,
  CLEAR_IMGURL_IN_UPLOAD,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_ERROR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  GET_ONE_PRODUCT_REQUEST,
  GET_ONE_PRODUCT_SUCCESS,
  GET_ONE_PRODUCT_ERROR,
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

// Set and clear uploaded images state
export const setImgInUpload = (imgsArray) => ({
  type: SET_IMGURL_IN_UPLOAD,
  payload: imgsArray,
});
export const clearImgInUpload = () => ({
  type: CLEAR_IMGURL_IN_UPLOAD,
});

// Get all products actions

const getAllProductsRequest = () => ({
  type: GET_ALL_PRODUCTS_REQUEST,
});
const getAllProductsSuccess = (subCategories) => ({
  type: GET_ALL_PRODUCTS_SUCCESS,
  payload: subCategories,
});
const getAllProductsError = (e) => ({
  type: GET_ALL_PRODUCTS_ERROR,
  payload: e,
});

export const getAllProductsAction = (count) => async (dispatch) => {
  try {
    dispatch(getAllProductsRequest());
    // Request to DB
    const products = await getAllProductsByCount(count);

    dispatch(getAllProductsSuccess(products.data));
  } catch (error) {
    dispatch(getAllProductsError());
  }
};

// Delete product actions

const deleteProductRequest = () => ({ type: DELETE_PRODUCT_REQUEST });
const deleteProductSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS,
});
const deleteProductError = (e) => ({
  type: DELETE_PRODUCT_ERROR,
  payload: e,
});

export const deleteProductAction = (slug, token) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());

    // Request to DB
    await deleteProduct(slug, token);

    dispatch(deleteProductSuccess());
    notification.success({
      message: `Product successfully deleted!`,
    });
  } catch (error) {
    dispatch(deleteProductError(error));
    notification.error({
      message: `Create product failed!`,
      description: error.message,
    });
  }
};

// Get one product actions

const getOneProductRequest = () => ({ type: GET_ONE_PRODUCT_REQUEST });
const getOneProductSuccess = (product) => ({
  type: GET_ONE_PRODUCT_SUCCESS,
  payload: product,
});
const getOneProductError = (e) => ({
  type: GET_ONE_PRODUCT_ERROR,
  payload: e,
});

export const getOneProductAction = (slug) => async (dispatch) => {
  try {
    dispatch(getOneProductRequest());

    // Request to DB
    const product = await getOneProduct(slug);

    dispatch(getOneProductSuccess(product.data));
  } catch (error) {
    dispatch(getOneProductError(error));
  }
};
