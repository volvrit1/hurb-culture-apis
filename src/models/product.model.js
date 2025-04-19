import mongoose from "mongoose";
import BaseSchema from "#models/base";
import Brand from "#models/brand";
import Category from "#models/category";
import SubCategory from "#models/subCategory";
import { saveFile } from "#utils/uploadFile";
const imageSchema = new BaseSchema({
  image: {
    type: String,
    file: true,
  },
});

const productSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: BaseSchema.Types.ObjectId,
    required: true,
    ref: Category,
  },
  subCategoryId: {
    type: BaseSchema.Types.ObjectId,
    ref: SubCategory,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
  },
  prescriptionRequired: {
    type: Boolean,
    default: false,
    required: true,
  },
  ingredients: {
    type: BaseSchema.Types.Mixed,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
  coverImage: {
    type: String,
    file: true,
  },
  images: {
    type: [imageSchema],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  reviewCount: {
    type: Number,
    min: 0,
  },
  brandId: {
    type: BaseSchema.Types.ObjectId,
    required: true,
    ref: Brand,
  },
});

productSchema.pre("save", saveFile);

imageSchema.pre("save", saveFile);


productSchema.index({ createdAt: 1 });

export default mongoose.model("product", productSchema);
