import slugify from 'slugify';
import Category from '../models/categoryModel.js';
import SubCategory from '../models/subCategoryModel.js';
import Product from '../models/productModel.js';
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = await Category.create({
      name,
      slug: slugify(name, { lower: true }),
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.log('createCategory API request error', error);
    res.status(400).send('Create category failed!');
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).exec();
    if (!category) {
      return next(
        new Error(
          'No document found with that slug – (categoryController.getCategory)',
        ),
      );
    }
    const products = await Product.find({ category }).populate('category');

    res.status(200).json({ category, products });
  } catch (error) {
    res.status(400).send('Get category failed!');
  }
};

export const updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name, { lower: true }) },
      { new: true },
    );

    if (!updatedCategory) {
      return next(
        new Error(
          'No document found with that slug – (categoryController.updateCategory)',
        ),
      );
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).send('Update category failed!');
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    if (!deletedCategory) {
      return next(
        new Error(
          'No document found with that slug – (categoryController.deleteCategory)',
        ),
      );
    }
    // need to send json
    res.status(204).json(deletedCategory);
  } catch (error) {
    res.status(400).send('Delete category failed!');
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({})
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(400).send('Get all categories failed!');
  }
};

export const getAllSubcategoriesByCategory = async (req, res) => {
  try {
    const { _id } = req.params;

    const subCategoriesByParentCategory = await SubCategory.find({
      category: _id,
    });

    res.status(200).json(subCategoriesByParentCategory);
  } catch (error) {
    res.status(400).send('Get all subcategories by parent category failed!');
  }
};
