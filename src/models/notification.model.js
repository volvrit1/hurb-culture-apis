import mongoose from "mongoose";
import BaseSchema from "#models/base";

const notificationSchema = new BaseSchema({
  userId: {
    type: BaseSchema.Types.ObjectId,
    required: true,
  },
  notification: {
    type: String,
    required: true,
    minLen: 10,
  },
  time: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("notification", notificationSchema);
