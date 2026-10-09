import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 52,
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
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
    },

    subcategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
      },
    ],

    quantity: {
      type: Number,
    },

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

    // If needed, we can create a separate Brand model later.
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
        star: {
          type: Number,
          min: 1,
          max: 5,
        },
        postedBy: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
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
  {
    timestamps: true,
  },
);

// Text search index
productSchema.index({
  title: 'text',
  description: 'text',
});

// Calculate average rating
productSchema.statics.calcAverageRatings = async function (productId) {
  const product = await this.aggregate([
    {
      $match: {
        _id: productId,
      },
    },
    {
      $project: {
        average: {
          $avg: '$ratings.star',
        },
        numberOfStars: {
          $size: '$ratings',
        },
      },
    },
  ]);

  if (!product.length) {
    return;
  }

  await this.findByIdAndUpdate(productId, {
    ratingsAverage: product[0].average || 0,
    ratingsQuantity: product[0].numberOfStars || 0,
  });
};

const Product = mongoose.model('Product', productSchema);

export default Product;
