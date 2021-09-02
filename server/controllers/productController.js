const slugify = require('slugify');

const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.log('createProduct API request error', error);
    res.status(400).send('Create product failed!');
  }
};
