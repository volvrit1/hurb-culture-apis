import BaseSchema from "#models/base";
import mongoose from "mongoose";
import Product from "#models/product";
import User from "#models/user";

const wishlistSchema = new BaseSchema({
  userId: {
    type: BaseSchema.Types.ObjectId,
    required: true,
    ref: User,
  },
  productIds: [
    {
      type: BaseSchema.Types.ObjectId,
      ref: Product,
    },
  ],
});

export default mongoose.model("wishlist", wishlistSchema);
