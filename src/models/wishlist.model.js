import BaseSchema from "#models/base";
import mongoose from "mongoose";
import User from "#models/user";

const wishlistSchema = new BaseSchema({
  userId: {
    type: BaseSchema.Types.ObjectId,
    required: true,
    ref: User,
  },
  productIds: {
    type: Array,
    of: BaseSchema.Types.ObjectId,
  },
});

export default mongoose.model("wishlist", wishlistSchema);
