import mongoose from "mongoose";
import BaseSchema from "#models/base";

const bannerSchema = new BaseSchema({
  image: {
    type: String,
    file: true,
  },
  slug: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    min: 1,
  },
  isOrdered: {
    type: Boolean,
    default: true,
  },
  link: {
    type: String,
  },
  // appScreen:{
  //
  // },
  description: {
    type: String,
  },
  title: {
    type: String,
  },
});

export default mongoose.model("Banner", bannerSchema);
