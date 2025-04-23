import mongoose from "mongoose";
import BaseSchema from "#models/base";
import BlogCategory from "#models/blogCategory";
import { saveFile } from "#utils/uploadFile";

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
    unique: true,
  },
  blogCategoryId: {
    type: BaseSchema.Types.ObjectId,
    ref: BlogCategory,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
});

blogSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

blogSchema.pre("save", saveFile);

export default mongoose.model("blog", blogSchema);
