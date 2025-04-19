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
    unique: true,
    ref: User,
  },
  products: [productCartSchema],
  brandId: {
    type: BaseSchema.Types.ObjectId,
    required: true,
    ref: Brand,
  },
});

export default mongoose.model("cart", cartSchema);
