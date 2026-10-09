import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Clone',
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      index: true,
    },
    role: {
      type: String,
      default: 'subscriber',
    },
    picture: String,

    cart: { type: Array, default: [] },
    address: String,
    wishlist: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }],
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
