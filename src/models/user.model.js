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
  contactNumber: {
    type: String,
    required: true,
  },
  secondaryContactNumber: {
    type: String,
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
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  accountHolderName: {
    type: String,
    required: true,
  },
  ifscCode: {
    type: String,
    required: true,
  },
  bankBranchName: {
    type: String,
    required: true,
  },
  branchAddress: {
    type: String,
    required: false,
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
});

export default mongoose.model("user", userSchema);
