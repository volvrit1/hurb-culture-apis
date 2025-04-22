import mongoose from "mongoose";
import BaseSchema from "#models/base";
import User from "#models/user";
import Brand from "#models/brand";
import Product from "#models/product";

const productCartSchema = new BaseSchema({
  product: {
    type: BaseSchema.Types.ObjectId,
    ref: Product,
  },
  quantity: {
    type: Number,
    min: 1,
  },
});

const cartSchema = new BaseSchema({
  userId: {
    type: BaseSchema.Types.ObjectId,
    required: true,
    ref: User,
  },
  products: [productCartSchema],
  brandId: {
    type: BaseSchema.Types.ObjectId,
    required: true,
    ref: Brand,
  },
});

cartSchema.index({ userId: 1, brandId: 1 }, { unique: true });

export default mongoose.model("cart", cartSchema);
