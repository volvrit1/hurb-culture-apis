import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";
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

categorySchema.pre("save", saveFile);

export default mongoose.model("Category", categorySchema);
