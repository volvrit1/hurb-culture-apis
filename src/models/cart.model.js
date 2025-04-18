import mongoose from "mongoose";
import BaseSchema from "#models/base";
import User from "#models/user";
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
});

export default mongoose.model("cart", cartSchema);
