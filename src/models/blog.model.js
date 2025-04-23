import mongoose from "mongoose";
import BaseSchema from "#models/base";

const blogSchema = new BaseSchema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minLen: 100,
  },
  coverImage: {
    type: String,
    file: true,
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("blog", blogSchema);
