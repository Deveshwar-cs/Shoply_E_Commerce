const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      requred: true,
      minLength: [2, 'Category name is too short'],
      maxLength: [32, 'Category name is too long'],
    },
    slug: { type: String, unique: true, lowercase: true, index: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
