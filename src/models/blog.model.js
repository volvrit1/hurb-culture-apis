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
});

export default mongoose.model("blog", blogSchema);
