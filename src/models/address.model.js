import BaseSchema from "#models/base";
import User from "#models/user";
import mongoose from "mongoose";

const addressSchema = new BaseSchema({
  userId: {
    type: BaseSchema.Types.ObjectId,
    required: true,
    ref: User,
  },
  name: {
    type: String,
    required: true,
  },
  houseNo: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["Billing", "Shipping"],
    required: true,
  },
});

export default mongoose.model("address", addressSchema);
