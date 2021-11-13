const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 52,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
    },
    subcategory: [
      {
        type: ObjectId,
        ref: 'SubCategory',
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ['Yes', 'No'],
    },
    color: {
      type: String,
      enum: ['Black', 'Brown', 'Silver', 'White', 'Blue', 'Red'],
    },
    // if needed, we can make Brand model, like we did with Categories
    brand: {
      type: String,
      enum: [
        'Apple',
        'Samsung',
        'Microsoft',
        'Lenovo',
        'Dell',
        'Xiaomi',
        'Google',
        'ASUS',
      ],
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: 'User' },
      },
    ],
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// We want calculate average rating of each product when user rate product
// 1) Create static method calcAverageRatings
// 2) Run calcAverageRatings when updateOne hook triggered

// When call updateOne method for updating rating (in productController.productRating function) it trigger Query middlewares  –> 'updateOne' hook

// Static mongoose method on Product model
productSchema.statics.calcAverageRatings = async function (productId) {
  const product = await Product.aggregate([
    { $match: { _id: productId } },
    {
      $project: {
        // floorAverage is new custom field in projection
        floorAverage: {
          $floor: { $avg: '$ratings.star' },
        },
        // numberOfStars is new custom field
        numberOfStars: { $size: '$ratings' },
      },
    },
  ]);

  // save results to Product document
  await this.findByIdAndUpdate(productId, {
    ratingsAverage: product[0].floorAverage,
    ratingsQuantity: product[0].numberOfStars,
  });
};

// Query middleware: 'updateOne' hooks
productSchema.pre('updateOne', async function () {
  // here 'this' keyword reference to Query
  // get current document from Mongoose Query and save in 'document' field of Query object
  this.document = await this.findOne();
  // 'this.document' – product document, it will be available in 'post' updateOne hook
});

// updateOne post hook runs after the document has been updated
productSchema.post('updateOne', async function () {
  // here document.constructor is Product model itself and it contain calcAverageRatings static method
  await this.document.constructor.calcAverageRatings(this.document._id);
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
