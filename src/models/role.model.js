import BaseSchema from "#models/base";
import mongoose from "mongoose";

const roleSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  permissions: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("role", roleSchema);
