import mongoose from "mongoose";
import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";

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
  position: {
    type: String,
    default: "Top",
    enum: ["Top", "Bottom", "Middle"],
  },
  link: {
    type: String,
  },
  description: {
    type: String,
  },
  title: {
    type: String,
  },
});

bannerSchema.pre("save", saveFile);

export default mongoose.model("Banner", bannerSchema);
