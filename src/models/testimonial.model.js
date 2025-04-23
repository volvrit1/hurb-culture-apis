import BaseSchema from "#models/base";
import mongoose from "mongoose";
import { saveFile } from "#utils/uploadFile";

const testimonialSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
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
  image: {
    type: String,
    file: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

testimonialSchema.pre("save", saveFile);

export default mongoose.model("testimonial", testimonialSchema);
