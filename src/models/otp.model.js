import mongoose from "mongoose";
import BaseSchema from "#models/base";

const otpSchema = new BaseSchema({
  type: {
    type: String,
    enum: ["phone", "email", "hybrid"],
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  otp: {
    type: Number,
    required: true,
  },
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export default mongoose.model("otp", otpSchema);
