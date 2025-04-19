import mongoose from "mongoose";
import BaseSchema from "#models/base";
import Brand from "#models/brand";
import Category from "#models/category";
import SubCategory from "#models/subCategory";
import { saveFile } from "#utils/uploadFile";

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
  },
  ingredients: {
    type: String,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  nutritionalValue: {
    type: BaseSchema.Types.Mixed,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    file: true,
  },
  image1: {
    type: String,
    file: true,
  },
  image2: {
    type: String,
    file: true,
  },
  image3: {
    type: String,
    file: true,
  },
  image4: {
    type: String,
    file: true,
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

productSchema.index({ createdAt: 1 });

export default mongoose.model("product", productSchema);
