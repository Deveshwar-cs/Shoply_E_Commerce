import axios from 'axios';

export const createProduct = async (product, authToken) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, product, {
    headers: {
      authToken,
    },
  });

export const getAllProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
