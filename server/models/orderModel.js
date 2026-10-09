import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
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
        'Cash On Delivery',
      ],
    },
    orderedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
