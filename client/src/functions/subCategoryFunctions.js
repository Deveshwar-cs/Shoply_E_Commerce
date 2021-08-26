import axios from 'axios';

export const getAllSubCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subcategories`);

export const getOneSubCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/subcategories/${slug}`);

export const deleteSubCategory = async (slug, authToken) =>
  await axios.delete(`${process.env.REACT_APP_API}/subcategories/${slug}`, {
    headers: {
      authToken,
    },
  });

export const updateSubCategory = async (slug, updatedSubCategory, authToken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/subcategories/${slug}`,
    updatedSubCategory,
    {
      headers: {
        authToken,
      },
    }
  );

export const createSubCategory = async (subCategory, authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/subcategories`,
    { subCategory },
    {
      headers: {
        authToken,
      },
    }
  );
