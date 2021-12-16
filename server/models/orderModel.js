const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        quantity: Number, // quantity of one product
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: 'Not processing',
      enum: [
        'Not processing',
        'Processing',
        'Dispatched',
        'Cancelled',
        'Completed',
      ],
    },
    orderedBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
