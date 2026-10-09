import slugify from 'slugify';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

export const createProduct = async (req, res) => {
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

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate('category')
      .populate('subcategory')
      .sort([['createdAt', 'desc']]);
    const selectedProduct = await Product.find({}).limit(
      parseInt(req.params.count),
    );
    res.status(201).json(allProducts);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      slug: req.params.slug,
    });
    console.log('Request Parameter:-', req.params.slug);
    console.log('Deleted Product:', deleteProduct);
    res.status(204).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

export const getOneProduct = async (req, res) => {
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

export const updateProduct = async (req, res) => {
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
      },
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

// WITH PAGINATION
export const customProductList = async (req, res) => {
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

export const productsCount = async (req, res) => {
  try {
    const total = await Product.estimatedDocumentCount();

    res.status(200).json(total);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

export const productRating = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId); // product that we want to rate
    const user = await User.findOne({ email: req.user.email }); // current user
    const { star } = req.body; // rating value from client
    // check if current user already rate this product and save result
    const existingRatnigObject = product.ratings.find(
      (rating) => rating.postedBy.toString() === user._id.toString(),
    );
    console.log('EXISTING PRODUCT');
    console.log(existingRatnigObject);
    // if current user doesn't rate product yet
    if (existingRatnigObject === undefined) {
      const ratingAdded = await Product.updateOne(
        { _id: product._id },
        {
          $push: {
            ratings: {
              star,
              postedBy: user._id,
            },
          },
        },
      );
      await Product.calcAverageRatings(product._id);

      console.log('RATING ADDED');
      console.log(ratingAdded);
      res.status(200).json(ratingAdded);
    }

    // if product have rating object by current user
    if (existingRatnigObject) {
      const ratingUpdated = await Product.updateOne(
        {
          _id: product._id,
          'ratings.postedBy': user._id,
        },
        {
          $set: {
            'ratings.$.star': star,
          },
        },
        { new: true },
      );

      await Product.calcAverageRatings(product._id);

      console.log('RATING UPDATED');
      console.log(ratingUpdated);

      return res.status(200).json(ratingUpdated);
    }
  } catch (error) {
    console.error('🔥 PRODUCT RATING ERROR:', error);

    return res.status(400).json({
      errormessage: error.message,
    });
  }
};

export const relatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    const related = await Product.find({
      _id: { $ne: product._id }, // find all products with id's not equal product._id
      category: product.category, // that match product category
    })
      .limit(3)
      .populate('category')
      .populate('subcategory')
      .exec();

    res.status(200).json(related);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

// SEARCH / FILTER

export const searchFilters = async (req, res) => {
  try {
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

    console.log('SEARCH FILTER REQUEST:', req.body);

    const filterQuery = {};

    // PRICE
    if (Array.isArray(price) && price.length === 2) {
      filterQuery.price = {
        $gte: Number(price[0]),
        $lte: Number(price[1]),
      };
    }

    // CATEGORY
    if (Array.isArray(category) && category.length > 0) {
      filterQuery.category = {
        $in: category,
      };
    }

    // RATING
    if (Array.isArray(stars) && stars.length > 0) {
      filterQuery.ratingsAverage = {
        $in: stars.map(Number),
      };
    }

    // SUBCATEGORY
    if (Array.isArray(subcategories) && subcategories.length > 0) {
      filterQuery.subcategory = {
        $in: subcategories,
      };
    }

    // SHIPPING
    if (Array.isArray(shipping) && shipping.length > 0) {
      filterQuery.shipping = {
        $in: shipping,
      };
    }

    // COLOR
    if (Array.isArray(color) && color.length > 0) {
      filterQuery.color = {
        $in: color,
      };
    }

    // BRAND
    if (Array.isArray(brand) && brand.length > 0) {
      filterQuery.brand = {
        $in: brand,
      };
    }

    // TEXT SEARCH
    if (query && query.trim().length > 0) {
      filterQuery.$text = {
        $search: query.trim(),
      };
    }

    console.log('FINAL FILTER QUERY:', JSON.stringify(filterQuery, null, 2));

    const products = await Product.find(filterQuery)
      .populate('category', '_id name')
      .populate('subcategory', '_id name')
      .sort([['createdAt', 'desc']]);

    console.log('PRODUCTS FOUND:', products.length);

    // IMPORTANT:
    // No matching products is NOT an error.
    // Return 200 with [].
    return res.status(200).json(products);
  } catch (error) {
    console.error('SEARCH FILTER ERROR:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to filter products',
      error: error.message,
    });
  }
};
