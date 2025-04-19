import mongoose from "mongoose";
import BaseSchema from "#models/base";

const userSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  secondaryPhone: {
    type: Number,
    required: false,
  },
  dateOfBirth: {
    type: Date, // or use Date type if format allows conversion
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  // Bank Account Information (for refunds)
  bankName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  accountHolderName: {
    type: String,
  },
  ifscCode: {
    type: String,
  },
  bankBranchName: {
    type: String,
  },
  branchAddress: {
    type: String,
  },
  newsletterSubscription: {
    type: Boolean,
    required: false,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
  ageDocument: {
    type: String,
    file: true,
  },
});

export default mongoose.model("user", userSchema);
