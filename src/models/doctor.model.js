import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import BaseSchema from "#models/base";

const doctorSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  qualification: {
    type: Array,
  },
  specialization: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
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
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  language: {
    type: Array,
    of: String,
  },
  about: {
    type: String,
    required: true,
  },
  packageDetails: {
    type: Array,
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

export default mongoose.model("doctor", doctorSchema);
