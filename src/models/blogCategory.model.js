import mongoose from "mongoose";
import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";

const blogCategorySchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    file: true,
  },
  description: {
    type: String,
    required: true,
  },
});

blogCategorySchema.pre("save", saveFile);

export default mongoose.model("blogCategory", blogCategorySchema);
