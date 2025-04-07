import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import BaseSchema from "#models/base";

const userSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^\d{10}$/,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  role: {
    type: String,
    enum: ["doctor", "user"],
    required: true,
  },
  address: String,
  password: {
    type: String,
    minlength: 8,
  },
  photo: {
    type: String,
    file: true,
  },
});

export default mongoose.model("user", userSchema);
