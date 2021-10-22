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
export const getCustomProductList = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/customproductlist`, {
    sort,
    order,
    page,
  });

// Pagination
export const getProductsTotal = async () =>
  await axios.get(`${process.env.REACT_APP_API}/totalproducts`);

// Rate product

export const rateProduct = async (productId, star, authToken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star }, // always object
    {
      headers: {
        authToken,
      },
    }
  );
