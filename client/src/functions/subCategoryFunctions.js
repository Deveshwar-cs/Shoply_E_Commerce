import axios from 'axios';

export const getAllSubCategories = async () => {
  try {
    await axios.get(`${process.env.REACT_APP_API}/subcategories`);
  } catch (error) {
    console.log('axios getAllSubCategories error =====>', error);
  }
};
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

export const createSubCategory = async (
  subCategory,
  parentCategory,
  authToken
) =>
  await axios.post(
    `${process.env.REACT_APP_API}/subcategories`,
    { name: subCategory, category: parentCategory },
    {
      headers: {
        authToken,
      },
    }
  );
