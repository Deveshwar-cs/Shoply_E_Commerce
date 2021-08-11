const slugify = require('slugify');

const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
  //
  try {
    const { name } = req.body;

    const newCategory = await Category.create({
      name,
      slug: slugify(name, { lower: true }),
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).send('Create category failed');
  }
};

exports.getCategory = async (req, res) => {
  //
};

exports.updateCategory = async (req, res) => {
  //
};

exports.deleteCategory = async (req, res) => {
  //
};

exports.getAllCategories = async (req, res) => {
  //
};
