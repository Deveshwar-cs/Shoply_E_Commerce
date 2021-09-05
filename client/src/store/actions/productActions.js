import { toast } from 'react-toastify';

import { createProduct } from '../../functions/productFunctions';

import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
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
    toast.error(error.message);
  }
};
