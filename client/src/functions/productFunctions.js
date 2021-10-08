import axios from 'axios';

export const createProduct = async (product, authToken) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, product, {
    headers: {
      authToken,
    },
  });

export const deleteProduct = async (slug, authToken) =>
  await axios.delete(`${process.env.REACT_APP_API}/products/${slug}`, {
    headers: {
      authToken,
    },
  });

export const getAllProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const getOneProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const updateProduct = async (slug, updatedProduct, authToken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/products/${slug}`,
    updatedProduct,
    {
      headers: {
        authToken,
      },
    }
  );

// get Product list with options (sort, order, limit)
export const getCustomProductList = async (sort, order, limit) =>
  await axios.post(`${process.env.REACT_APP_API}/customproductlist`, {
    sort,
    order,
    limit,
  });
