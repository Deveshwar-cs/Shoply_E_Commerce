import { toast } from 'react-toastify';

import { createProduct } from '../../functions/productFunctions';
import { getAllSubCategoriesByParent } from '../../functions/categoryFunctions';

import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_REQUEST,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_SUCCESS,
  GET_SUBCATEGORIES_BY_PARENT_PRODUCT_ERROR,
  CLEAR_SUBCATEGORIES_BY_PARENT_PRODUCT_SUCCESS,
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

    toast.success(`Product ${product.title} successfully created!`);
  } catch (error) {
    dispatch(createProductError(error));
    //here we grab error message from server productController error response with axios
    toast.error(error.response.data.errormessage);
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
  type: CLEAR_SUBCATEGORIES_BY_PARENT_PRODUCT_SUCCESS,
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

// export const setProductParentCategory = (parentCategory) => ({
//   type: SET_PRODUCT_PARENT_CATEGORY,
//   payload: parentCategory,
// });
// export const clearProductParentCategory = () => ({
//   type: CLEAR_PRODUCT_PARENT_CATEGORY,
// });
