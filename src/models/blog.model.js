import mongoose from "mongoose";
import BaseSchema from "#models/base";
import BlogCategory from "#models/blogCategory";

const blogSchema = new BaseSchema({
  title: {
    type: String,
    required: true,
    unique: true,
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
  blogCategoryId: {
    type: BaseSchema.Types.ObjectId,
    ref: BlogCategory,
    required: true,
  },
});

export default mongoose.model("blog", blogSchema);
