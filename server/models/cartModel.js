import mongoose from 'mongoose';
const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
        },
        quantity: Number, // quantity of one product
        price: Number,
      },
    ],
    totalPrice: Number, // total products in cart
    totalPriceAfterDiscount: Number,
    orderedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
