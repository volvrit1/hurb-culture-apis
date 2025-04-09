import express from "express";
import validator from "#middlewares/validator";
import asyncHandler from "#utils/asyncHandler";
import BlogController from "#controllers/blog";
import Blog from "#models/blog";

const router = express.Router();

router
  .route("/:id?")
  .get(asyncHandler(BlogController.get.bind(BlogController)))
  .post(
    validator(Blog),
    asyncHandler(BlogController.create.bind(BlogController)),
  )
  .put(
    validator(Blog, true),
    asyncHandler(BlogController.update.bind(BlogController)),
  )
  .delete(asyncHandler(BlogController.deleteDoc.bind(BlogController)));

export default router;
