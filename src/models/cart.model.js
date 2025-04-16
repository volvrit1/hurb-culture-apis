import mongoose from "mongoose";
import BaseSchema from "#models/base";
import User from "#models/user";
import Product from "#models/product";

const cartSchema = new BaseSchema({
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

export default mongoose.model("cart", cartSchema);
