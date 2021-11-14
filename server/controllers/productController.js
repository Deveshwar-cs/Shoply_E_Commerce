const slugify = require('slugify');
const ObjectId = require('bson').ObjectId;

const Product = require('../models/productModel');
const User = require('../models/userModel');

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

// WITHOUT PAGINAGITION
// exports.customProductList = async (req, res) => {
//   try {
//     // createdAt/updatedAt, desc/asc, 3
//     const { sort, order, limit } = req.body;

//     const customList = await Product.find({})
//       .populate('category')
//       .populate('subcategory')
//       .sort([[sort, order]]) // some Mongoose weird syntax  ==> https://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
//       .limit(limit);

//     res.status(200).json(customList);
//   } catch (error) {
//     res.status(400).json({
//       errormessage: error.message,
//     });
//   }
// };

// WITH PAGINATION
exports.customProductList = async (req, res) => {
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;

    const customList = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subcategory')
      .sort([[sort, order]]) // some Mongoose weird syntax  ==> https://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
      .limit(perPage);

    res.status(200).json(customList);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};
// PAGINATION
exports.productsCount = async (req, res) => {
  try {
    const total = await Product.find({}).sort().estimatedDocumentCount();

    res.status(200).json(total);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

exports.productRating = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId); // product that we want to rate
    const user = await User.findOne({ email: req.user.email }); // current user
    const { star } = req.body; // rating value from client

    // check if current user already rate this product and save result
    const existingRatnigObject = product.ratings.find(
      (rating) => rating.postedBy.toString() === user._id.toString()
    );

    // if current user doesn't rate product yet
    if (!existingRatnigObject) {
      const ratingAdded = await Product.updateOne(
        { _id: product._id },
        { $push: { ratings: { star, postedBy: user._id } } },
        {
          new: true,
        }
      );

      res.status(200).json(ratingAdded);
    }

    // if product have rating object by current user
    if (existingRatnigObject) {
      const ratingUpdated = await Product.updateOne(
        { ratings: { $elemMatch: existingRatnigObject } }, // https://docs.mongodb.com/manual/reference/operator/query/elemMatch/
        { $set: { 'ratings.$.star': star } }, // https://docs.mongodb.com/manual/reference/operator/update/set/
        {
          new: true,
        }
      );
      res.status(200).json(ratingUpdated);
    }
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

exports.relatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    const related = await Product.find({
      _id: { $ne: product._id }, // find all products with id's not equal product._id
      category: product.category, // that match product category
    })
      .limit(3)
      .populate('category')
      .populate('subcategory')
      .populate('postedBy')
      .exec();

    res.status(200).json(related);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

// SEARCH / FILTER

const handleQuery = async (req, res, query) => {
  try {
    const products = await Product.find({ $text: { $search: query } })
      .populate('category', '_id name')
      .populate('subcategory', '_id name')
      .populate('postedBy', '_id name');

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

exports.searchFilters = async (req, res) => {
  const {
    query,
    price,
    category,
    stars,
    subcategories,
    shipping,
    color,
    brand,
  } = req.body;

  console.log('PRODUCT CONTROLLER {searchFilters} req.body ===>', req.body);
  // build filter query
  let filterQuery = {};

  if (price) {
    filterQuery.price = { $gte: price[0], $lte: price[1] };
  }

  if (category && category.length) {
    filterQuery.category = category;
  }

  if (stars && stars.length) {
    filterQuery.ratingsAverage = stars;
  }
  if (subcategories && subcategories.length) {
    filterQuery.subcategory = { $in: subcategories };
  }
  if (shipping) {
    filterQuery.shipping = shipping;
  }
  if (color && color.length) {
    filterQuery.color = color;
  }
  if (brand && brand.length) {
    filterQuery.brand = brand;
  }
  console.log(
    'PRODUCT CONTROLLER { searchFilters – filterQuery} ===>',
    filterQuery
  );

  if (query) {
    await handleQuery(req, res, query);
  } else {
    try {
      const products = await Product.find(filterQuery)
        .populate('category', '_id name')
        .populate('subcategory', '_id name')
        .populate('postedBy', '_id name')
        .sort([['createdAt', 'desc']]);

      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({
        errormessage: error.message,
      });
    }
  }
};
