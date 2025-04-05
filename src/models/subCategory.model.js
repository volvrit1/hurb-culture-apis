import BaseSchema from "#models/base";
import Category from "#models/category";
import { saveFile } from "#utils/uploadFile";
import mongoose from "mongoose";

const subCategorySchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    file: true,
  },
  categoryId: {
    type: BaseSchema.Types.ObjectId,
    ref: Category,
    required: true,
  },
});

subCategorySchema.pre("save", saveFile);

export default mongoose.model("subCategory", subCategorySchema);
