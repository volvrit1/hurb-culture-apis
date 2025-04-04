import mongoose from "mongoose";
import BaseSchema from "#models/base";

const reviewSchema = new BaseSchema({
  rating: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: (props) => `${props.value} is not an integer!`,
    },
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
  },
  comment: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    file: true,
  },
});

export default mongoose.model("review", reviewSchema);
