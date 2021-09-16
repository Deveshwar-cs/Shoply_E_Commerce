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
