const slugify = require('slugify');

const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);

    const newProduct = await Product.create(req.body);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate('category')
      .populate('subcategory')
      .sort([['createdAt', 'desc']]);

    res.status(201).json(allProducts);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      slug: req.params.slug,
    });
    res.status(204).json(deletedProduct);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
    })
      .populate('category')
      .populate('subcategory');

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      req.body,
      {
        new: true,
      }
    )
      .populate('category')
      .populate('subcategory');

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};
