import axios from 'axios';

export const getAllCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

export const getOneCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/categories/${slug}`);

export const deleteCategory = async (slug, authToken) =>
  await axios.delete(`${process.env.REACT_APP_API}/categories/${slug}`, {
    headers: {
      authToken,
    },
  });

export const updateCategory = async (slug, updatedCategory, authToken) =>
  await axios.patch(
    `${process.env.REACT_APP_API}/categories/${slug}`,
    updatedCategory,
    {
      headers: {
        authToken,
      },
    }
  );

export const createCategory = async (name, authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/categories`,
    { name },
    {
      headers: {
        authToken,
      },
    }
  );
