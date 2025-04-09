import BaseSchema from "#models/base";
import User from "#models/user";
import Product from "#models/product";
import mongoose from "mongoose";

const reviewSchema = new BaseSchema({
  userId: {
    type: BaseSchema.Types.ObjectId,
    required: true,
    ref: User,
  },
  productId: {
    type: BaseSchema.Types.ObjectId,
    required: true,
    ref: Product,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    requried: true,
  },
  review: {
    type: String,
    required: true,
  },
});

export default mongoose.model("review", reviewSchema);
