import User from "#models/user";
import mongoose from "mongoose";
import BaseSchema from "#models/base";

const bookingSchema = new BaseSchema({
    userId: {
    type: BaseSchema.Types.ObjectId,
    ref: User,
    required: true,
  },
      eventDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["upcoming", "completed", "cancelled"],
    default: "upcoming",
  },
});

export default mongoose.model("booking", bookingSchema);
