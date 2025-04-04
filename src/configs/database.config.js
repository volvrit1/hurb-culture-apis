import mongoose from "mongoose";

async function connectDB(DB_URI) {
  try {
    await mongoose.connect(DB_URI);
  } catch (err) {
    throw err;
  }
}

export default connectDB;
