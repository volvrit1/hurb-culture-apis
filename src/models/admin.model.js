import BaseSchema from "#models/base";
import Role from "#models/role";
import mongoose from "mongoose";

const adminSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roleId: {
    type: BaseSchema.Types.ObjectId,
    required: true,
    ref: Role,
  },
});

export default mongoose.model("admin", adminSchema);
