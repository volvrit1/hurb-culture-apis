import BaseSchema from "#models/base";
import Category from "#models/category";
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

export default mongoose.model("subCategory", subCategorySchema);
