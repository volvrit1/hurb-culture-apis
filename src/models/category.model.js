import BaseSchema from "#models/base";
import mongoose from "mongoose";

const categorySchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    file: true,
  },
});

export default mongoose.model("Category", categorySchema);
