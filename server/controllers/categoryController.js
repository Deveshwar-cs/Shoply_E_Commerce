const slugify = require('slugify');

const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
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

exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).exec();
    if (!category) {
      return next(
        new Error(
          'No document found with that slug – (categoryController.getCategory)'
        )
      );
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).send('Get category failed!');
  }
};

exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name, { lower: true }) },
      { new: true }
    );

    if (!updatedCategory) {
      return next(
        new Error(
          'No document found with that slug – (categoryController.updateCategory)'
        )
      );
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).send('Update category failed!');
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    if (!deletedCategory) {
      return next(
        new Error(
          'No document found with that slug – (categoryController.deleteCategory)'
        )
      );
    }
    res.status(204);
  } catch (error) {
    res.status(400).send('Delete category failed!');
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({})
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(400).send('Get all categories failed!');
  }
};
