import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      requred: true,
      minLength: [2, 'Category name is too short'],
      maxLength: [32, 'Category name is too long'],
    },
    slug: { type: String, unique: true, lowercase: true, index: true },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Subcategory must belong to a category!'],
    },
  },
  {
    timestamps: true,
  },
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

export default SubCategory;
