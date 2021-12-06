const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        quantity: Number, // quantity of one product
        price: Number,
      },
    ],
    totalPrice: Number, // total products in cart
    totalPriceAfterDiscount: Number,
    orderedBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
