const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowecase: true,
      index: true,
    },
    role: {
      type: String,
      default: 'subscriber',
    },
    cart: { type: Array, default: [] },
    address: String,
    wishlist: [{ type: ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
